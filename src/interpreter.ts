import { TokenType } from "./lexer";
import { BinaryExp, BracketsExp, Exp, IdentifierExp, NoopExp, NumberExp } from "./parser";

interface Parameters{
    [key: string]: number
}

export class NegateExp extends Exp{
    expression: Exp
    constructor(expression: Exp){
        super()
        this.expression=expression
    }
}

function doOperation(left: number, right: number, op: TokenType): number {
    switch(op){
        case TokenType.tok_op_plus:
            return left + right
        case TokenType.tok_op_minus:
            return left - right
        case TokenType.tok_op_multiply:
            return left * right
        case TokenType.tok_op_devide:
            return left / right
        case TokenType.tok_op_power:
            return Math.pow(left, right)
        case TokenType.tok_op_modulo:
            return left % right
        default:
            throw new Error("Operation "+ op+" unknown")
    }
}


export function evaluate(expression: Exp, parameters: Parameters = {}): number{
    switch(true){
        case expression instanceof NoopExp:
            return 0;
        case expression instanceof BinaryExp:
            let bin = expression as BinaryExp;
            return doOperation(evaluate(bin.left, parameters), evaluate(bin.right, parameters), bin.op)
        case expression instanceof IdentifierExp:
            let indent = expression as IdentifierExp;
            return parameters[indent.value]
        case expression instanceof NumberExp:
            let num = expression as NumberExp;
            return num.value
        case expression instanceof BracketsExp:
            let brackets = expression as BracketsExp;
            return evaluate(brackets.expression, parameters)
        case expression instanceof NegateExp:
            let negate = expression as NegateExp;
            return -evaluate(negate.expression, parameters)
        default: 
        return  -1;
    }
}