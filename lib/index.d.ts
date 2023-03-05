import { parseProgram } from "./parser";
import { evaluate, Parameters } from "./interpreter";
export default function execute(program: string, params: Parameters): {
    res: number;
    err: string;
};
export { evaluate, parseProgram };
