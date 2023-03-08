import { TokenType } from "./lexer";
import { BinaryExp, BracketsExp, Exp, FunctionExp, FunctionType, IdentifierExp, NegateExp, NoopExp, NumberExp } from "./parser";

export interface Parameters{
    [key: string]: number
}

export const builtIn = {
    pi: Math.PI,
    e: Math.E,
} as Parameters

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
            throw new Error("Operation "+ op +" unknown")
    }
}

function doFunction(arg: number, func: FunctionType): number {
    switch(func){
        case FunctionType.sin:
            return Math.sin(arg)
        case FunctionType.asin:
            return Math.asin(arg)
        case FunctionType.sinh:
            return Math.sinh(arg)
        case FunctionType.asinh:
            return Math.asinh(arg)
        case FunctionType.cos:
            return Math.cos(arg)
        case FunctionType.acos:
            return Math.acos(arg)
        case FunctionType.cosh:
            return Math.cosh(arg)
        case FunctionType.acos:
            return Math.acos(arg)
        case FunctionType.acosh:
            return Math.acosh(arg)
        case FunctionType.tan:
            return Math.tan(arg)
        case FunctionType.atan:
            return Math.atan(arg)
        case FunctionType.tanh:
            return Math.tanh(arg)
        case FunctionType.atanh:
            return Math.atanh(arg)
        case FunctionType.round:
            return Math.round(arg)
        case FunctionType.floor:
            return Math.floor(arg)
        case FunctionType.ceil:
            return Math.ceil(arg)
        case FunctionType.abs:
            return Math.abs(arg)
        case FunctionType.sqrt:
            return Math.sqrt(arg)
        case FunctionType.exp:
            return Math.exp(arg)
        case FunctionType.ln:
        case FunctionType.log:
            return Math.log(arg)
        case FunctionType.log10:
            return Math.log10(arg)
        default:
            throw new Error("Function "+ func +" unknown")
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
            if(parameters[indent.value] !== undefined){
                return parameters[indent.value]
            }
            if(builtIn[indent.value.toLowerCase()] !== undefined){
                return builtIn[indent.value.toLowerCase()]
            }
            return  -1
        case expression instanceof NumberExp:
            let num = expression as NumberExp;
            return num.value
        case expression instanceof BracketsExp:
            let brackets = expression as BracketsExp;
            return evaluate(brackets.expression, parameters)
        case expression instanceof NegateExp:
            let negate = expression as NegateExp;
            return -evaluate(negate.expression, parameters)
        case expression instanceof FunctionExp:
            let func = expression as FunctionExp;
            return doFunction(evaluate(func.expression, parameters), func.func)
        default: 
        return  -1;
    }
}