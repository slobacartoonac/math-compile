import { TokenType } from './lexer';
export declare enum FunctionType {
    sin = 0,
    asin = 1,
    sinh = 2,
    asinh = 3,
    cos = 4,
    acos = 5,
    cosh = 6,
    acosh = 7,
    tan = 8,
    atan = 9,
    tanh = 10,
    atanh = 11,
    round = 12,
    floor = 13,
    ceil = 14,
    abs = 15,
    sqrt = 16,
    exp = 17,
    log = 18,
    log10 = 19,
    ln = 20
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
