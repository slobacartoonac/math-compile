import { Exp } from "./parser";
export interface Parameters {
    [key: string]: number;
}
export declare const builtIn: Parameters;
export declare function evaluate(expression: Exp, parameters?: Parameters): number;
