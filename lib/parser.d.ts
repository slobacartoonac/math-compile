import { TokenType } from './lexer';
export declare enum FunctionType {
    sin = 0,
    cos = 1,
    tan = 2,
    round = 3,
    floor = 4,
    ceil = 5,
    abs = 6,
    sqrt = 7,
    exp = 8,
    log = 9,
    log10 = 10
}
export declare const functionList: string[];
export declare class Exp {
}
export declare class NoopExp extends Exp {
}
export declare class NegateExp extends Exp {
    expression: Exp;
    constructor(expression: Exp);
}
export declare class BracketsExp extends Exp {
    expression: Exp;
    constructor(expression: Exp);
}
export declare class NumberExp extends Exp {
    value: number;
    constructor(value: number);
}
export declare class IdentifierExp extends Exp {
    value: string;
    constructor(value: string);
}
export declare class BinaryExp extends Exp {
    left: Exp;
    right: Exp;
    op: TokenType;
    constructor(left: Exp, right: Exp, op: TokenType);
}
export declare class FunctionExp extends Exp {
    expression: Exp;
    func: FunctionType;
    constructor(expression: Exp, func: FunctionType);
}
export declare function parseProgram(program: string): Exp;
