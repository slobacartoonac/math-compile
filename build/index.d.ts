import { parseProgram } from "./parser";
import { evaluate, Parameters } from "./interpreter";
declare function execute(program: string, params: Parameters): {
    res: number;
    err: string;
};
export { execute, evaluate, parseProgram };
