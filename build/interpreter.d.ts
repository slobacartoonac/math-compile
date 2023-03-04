import { Exp } from "./parser";
export interface Parameters {
    [key: string]: number;
}
export declare class NegateExp extends Exp {
    expression: Exp;
    constructor(expression: Exp);
}
export declare function evaluate(expression: Exp, parameters?: Parameters): number;
