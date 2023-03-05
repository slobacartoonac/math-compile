import { TokenType } from './lexer';
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
export declare function parseProgram(program: string): Exp;
