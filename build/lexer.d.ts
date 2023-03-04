export declare let CurTok: TokenType;
export declare function getNextToken(): TokenType;
export declare function getTokenElement(): Token;
export declare let IdentifierStr: string;
export declare let NumVal: number;
export declare function setInput(_program: string): void;
export declare function tokenize(program: string): Token[];
export declare enum TokenType {
    tok_eof = "tok_eof",
    tok_identifier = "tok_identifier",
    tok_number = "tok_number",
    tok_op_plus = "tok_op_plus",
    tok_op_minus = "tok_op_minus",
    tok_op_multiply = "tok_op_multiply",
    tok_op_devide = "tok_op_devide",
    tok_op_power = "tok_op_power",
    tok_op_modulo = "tok_op_modulo",
    tok_open = "tok_open",
    tok_close = "tok_close"
}
export declare class Token {
    tokenType: TokenType;
    column: number;
    line: number;
    str: string;
    value: number;
    constructor(tokenType: TokenType, column: number, line: number, str?: string, value?: number);
}
