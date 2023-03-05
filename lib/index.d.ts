import { parseProgram } from "./parser";
import { evaluate, Parameters } from "./interpreter";
export declare function execute(program: string, params?: Parameters): {
    res: number;
    err: string;
};
export { evaluate, parseProgram };
