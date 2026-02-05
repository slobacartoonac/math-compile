import { EOF, isalnum, isalpha, isdigit, isspace, strtod } from "./std";

export let CurTok:TokenType;

export function getNextToken() { return CurTok = gettok(); }

export function getTokenElement(){
    switch (CurTok) {
        case TokenType.tok_identifier:
            // do something
            return new Token( TokenType.tok_identifier,CurLoc.Col,CurLoc.Line, IdentifierStr)
        case TokenType.tok_number:
            // do something
            return new Token( TokenType.tok_number, CurLoc.Col,CurLoc.Line, '', NumVal)  
        default:
            return new Token(CurTok, CurLoc.Col, CurLoc.Line)
    }
}

export let IdentifierStr: string; // Filled in if tok_identifier
export let NumVal: number;        // Filled in if tok_number
let LastChar = ' ';
let CurLoc: SourceLocation ;
let LexLoc: SourceLocation = {Line: 1, Col: 0};

export function setInput(_program: string){
    program = _program
    LastChar = ''
    LexLoc = {Line: 1, Col: 0}; 
    CurTok = null
}

export function tokenize(program: string): Token[]{
    setInput(program)
    let tokens = [];
    while(CurTok!=TokenType.tok_eof){
        getNextToken()
        tokens.push(getTokenElement())
    }
    return tokens
}

// The lexer returns tokens [0-255] if it is an unknown character, otherwise one
// of these for known things.

export enum TokenType {
    tok_eof = "tok_eof",
    // primary
    tok_identifier = "tok_identifier",
    tok_number = "tok_number",

    // operators
    tok_op_plus = "tok_op_plus",
    tok_op_minus = "tok_op_minus",
    tok_op_multiply = "tok_op_multiply",
    tok_op_devide = "tok_op_devide",
    tok_op_power = "tok_op_power",
    tok_op_modulo = "tok_op_modulo",

    // brackets
    tok_open = "tok_open",
    tok_close = "tok_close",
    tok_op_factorial = "tok_op_factorial",
    tok_open_close_abs = "tok_open_close_abs"
};

interface SourceLocation
{
    Line: number;
    Col: number;
};

function advance()
{
    let LastChar = getchar();

    if (LastChar == '\n' || LastChar == '\r')
    {
        LexLoc.Line++;
        LexLoc.Col = 0;
    }
    else
        LexLoc.Col++;
    return LastChar;
}

export class Token {
    tokenType: TokenType
    column: number
    line: number
    str: string
    value: number

    constructor(    tokenType: TokenType,
        column: number,
        line: number,
        str: string = '',
        value: number = 0) {
            this.tokenType = tokenType
            this.column = column
            this.line = line
            this.str = str
            this.value = value
    }
  }

/// gettok - Return the next token from standard input.

let program: string = "";

function getchar(): string{
    let chars = program.split('')
    let ret = chars.shift()
    if(ret === undefined){
        program = '\0'
        return EOF
    }
    program = chars.join('')
    return ret
}



function gettok(): TokenType
{
    // Skip any whitespace.
    while (isspace(LastChar))
        LastChar = advance();

    CurLoc = LexLoc;

    if (isalpha(LastChar))
    { // identifier: [a-zA-Z][a-zA-Z0-9]*
        IdentifierStr = LastChar;
        while (isalnum((LastChar = advance())))
            IdentifierStr += LastChar;
        return TokenType.tok_identifier;
    }

    if (isdigit(LastChar) || LastChar == '.')
    { // Number: [0-9.]+
        let NumStr='';
        do
        {
            NumStr += LastChar;
            LastChar = advance();
        } while (isdigit(LastChar) || LastChar == '.');

        NumVal = strtod(NumStr);
        return TokenType.tok_number;
    }

    if (LastChar == "+"){
        LastChar = advance();
        return TokenType.tok_op_plus;
    }

    if (LastChar == "-"){
        LastChar = advance();
        return TokenType.tok_op_minus;
    }

    if (LastChar == "*"){
        LastChar = advance();
        return TokenType.tok_op_multiply;
    }
        
    if (LastChar == "/"){
        LastChar = advance();
        return TokenType.tok_op_devide;
    }

    if (LastChar == "^"){
        LastChar = advance();
        return TokenType.tok_op_power;
    }
    if(LastChar == "%"){
        LastChar = advance();
        return TokenType.tok_op_modulo;
    }

    if(LastChar == "!"){
        LastChar = advance();
        return TokenType.tok_op_factorial;
    }

    if (["{","[","("].includes(LastChar)){
        LastChar = advance();
        return TokenType.tok_open;
    }

    if (["}","]",")"].includes(LastChar)){
        LastChar = advance();
        return TokenType.tok_close;
    }

    if(LastChar == "|"){
        LastChar = advance();
        return TokenType.tok_open_close_abs;
    }    

    if (LastChar == '#')
    {
        // Comment until end of line.
        do
            LastChar = advance();
        while (LastChar != EOF && LastChar != '\n' && LastChar != '\r');

        if (LastChar != EOF)
            return gettok();
    }

    // Check for end of file.  Don't eat the EOF.
    if (LastChar == EOF)
        return TokenType.tok_eof;

    // Otherwise, just return the character as its ascii value.
    let oldChar = LastChar
    LastChar = advance();
    throw Error("Undefined token"+oldChar+" ( "+oldChar.charCodeAt(0)+" ) at: "+JSON.stringify(CurLoc))
}

