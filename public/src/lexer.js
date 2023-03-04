//===----------------------------------------------------------------------===//
// Lexer
//===----------------------------------------------------------------------===//
import { EOF, isalnum, isalpha, isdigit, isspace, strtod } from "./std";
// The lexer returns tokens [0-255] if it is an unknown character, otherwise one
// of these for known things.
export var Token;
(function (Token) {
    Token[Token["tok_eof"] = -1] = "tok_eof";
    // primary
    Token[Token["tok_identifier"] = -4] = "tok_identifier";
    Token[Token["tok_number"] = -5] = "tok_number";
    // operators
    Token[Token["tok_binary"] = -11] = "tok_binary";
    Token[Token["tok_unary"] = -12] = "tok_unary";
})(Token || (Token = {}));
;
function getTokName(Tok) {
    switch (Tok) {
        case Token.tok_eof:
            return "eof";
        case Token.tok_identifier:
            return "identifier";
        case Token.tok_number:
            return "number";
        case Token.tok_binary:
            return "binary";
        case Token.tok_unary:
            return "unary";
        default:
            return "unknownToken";
    }
}
;
let CurLoc;
let LexLoc = { Line: 1, Col: 0 };
function advance() {
    let LastChar = getchar();
    if (LastChar == '\n' || LastChar == '\r') {
        LexLoc.Line++;
        LexLoc.Col = 0;
    }
    else
        LexLoc.Col++;
    return LastChar;
}
export let IdentifierStr; // Filled in if tok_identifier
export let NumVal; // Filled in if tok_number
/// gettok - Return the next token from standard input.
let input = "";
export function setInput(_input) {
    input = _input;
}
function getchar() {
    let chars = input.split('');
    let ret = chars.shift();
    if (ret === undefined) {
        input = '\0';
        return EOF;
    }
    input = chars.join('');
    return ret;
}
function gettok() {
    let LastChar = ' ';
    // Skip any whitespace.
    while (isspace(LastChar))
        LastChar = advance();
    CurLoc = LexLoc;
    if (isalpha(LastChar)) { // identifier: [a-zA-Z][a-zA-Z0-9]*
        IdentifierStr = LastChar;
        while (isalnum((LastChar = advance())))
            IdentifierStr += LastChar;
        if (IdentifierStr == "binary")
            return Token.tok_binary;
        if (IdentifierStr == "unary")
            return Token.tok_unary;
        return Token.tok_identifier;
    }
    if (isdigit(LastChar) || LastChar == '.') { // Number: [0-9.]+
        let NumStr = '';
        do {
            NumStr += LastChar;
            LastChar = advance();
        } while (isdigit(LastChar) || LastChar == '.');
        NumVal = strtod(NumStr);
        return Token.tok_number;
    }
    if (LastChar == '#') {
        // Comment until end of line.
        do
            LastChar = advance();
        while (LastChar != EOF && LastChar != '\n' && LastChar != '\r');
        if (LastChar != EOF)
            return gettok();
    }
    // Check for end of file.  Don't eat the EOF.
    if (LastChar == EOF)
        return Token.tok_eof;
    // Otherwise, just return the character as its ascii value.
    LastChar = advance();
    throw Error("Undefined token at: " + JSON.stringify(LexLoc));
}
export let CurTok;
export function getNextToken() { return CurTok = gettok(); }
//# sourceMappingURL=lexer.js.map