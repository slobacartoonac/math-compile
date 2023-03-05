import { Exp, NoopExp, parseProgram } from "./parser";
import { evaluate, Parameters } from "./interpreter";

let programs:{[program: string]: Exp} = {}
export function execute(program: string, params:Parameters = {}){
    let err = ''
    let res = 0;
    try{
        let ast: Exp = new NoopExp();
        if(programs[program]){
            ast = programs[program]
        } else{
            ast = parseProgram(program)
            programs[program] = ast
        }
        res = evaluate(ast, params)
    } catch(e){
        err = e.toString()
    }
    return {res, err}
}

export { evaluate, parseProgram}