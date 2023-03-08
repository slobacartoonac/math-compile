import { TokenType, Token, tokenize} from './lexer';

let tokens: Token[];
let current = 0;
let currentTok: Token
function advance(){
    current++
    if(tokens.length <= current){
        current = tokens.length -1
        return new Token(TokenType.tok_eof,0,0)
    }
    currentTok = tokens[current]
    return tokens[current]
}
function head(): Token{
    return tokens[current]
}
function match(_type: TokenType){
    return head().tokenType === _type
}

function isOperation(op: TokenType = head().tokenType){
    return [TokenType.tok_op_plus,
    TokenType.tok_op_minus,
    TokenType.tok_op_multiply ,
    TokenType.tok_op_devide,
    TokenType.tok_op_modulo,
    TokenType.tok_op_power].includes(op)
}
















export enum FunctionType {
    sin,
    asin,
    sinh,
    asinh,
    cos,
    acos,
    cosh,
    acosh,
    tan,
    atan,
    tanh,
    atanh,
    round,
    floor,
    ceil,
    abs,
    sqrt,
    exp,
    log,
    log10,
    ln
}

export const functionList: string[] = Object.keys(FunctionType)

function isFunction(str: string){
    return functionList.includes(str.toLowerCase())
}

function indexOfFunction(str: string){
    return functionList.indexOf(str.toLowerCase())
}

function opPriority(op: TokenType){
    return (({[TokenType.tok_op_plus]: 1,
        [TokenType.tok_op_minus]: 1,
        [TokenType.tok_op_multiply]: 2,
        [TokenType.tok_op_devide]: 2,
        [TokenType.tok_op_modulo]: 4,
        [TokenType.tok_op_power]: 5} as any)[op])
}

function isPrefix(){
    return [TokenType.tok_op_plus,
        TokenType.tok_op_minus].includes(head().tokenType)
}
export class Exp {}

export class NoopExp extends Exp{}

export class NegateExp extends Exp{
    expression: Exp
    constructor(expression: Exp){
        super()
        this.expression=expression
    }
}
export class BracketsExp extends Exp{
    expression: Exp
    constructor(expression: Exp){
        super()
        this.expression=expression
    }
}

export class NumberExp extends Exp{
    value: number
    constructor(value: number){
        super()
        this.value=value
    }
}

export class IdentifierExp extends Exp{
    value: string
    constructor(value: string){
        super()
        this.value=value
    }
}

export class BinaryExp extends Exp{
    left: Exp
    right: Exp
    op: TokenType
    constructor(
        left: Exp,
        right: Exp,
        op: TokenType){
        super()
        this.left = left
        this.right = right
        this.op = op
    }
}

export class FunctionExp  extends Exp{
    expression: Exp
    func: FunctionType
    constructor(
        expression: Exp,
        func: FunctionType
        ){
            super()
            this.expression = expression
            this.func =func
        }
}

class BinaryExpCandidate extends Exp{
    priority: number
    op: TokenType
    constructor(op: TokenType){
        super()
        this.priority = opPriority(op)
        this.op = op
    }
}


function step(prev?: Exp): Exp {
    if(match(TokenType.tok_eof) || match(TokenType.tok_close)){
        return null
    }
    let prevAthom = prev && !(prev instanceof BinaryExpCandidate)
    if(prevAthom && isOperation()){
        var op = head().tokenType
        advance()
        if(op == TokenType.tok_op_multiply && head().tokenType == TokenType.tok_op_multiply){
            advance()
            return new BinaryExpCandidate(TokenType.tok_op_power)
        }
        return new BinaryExpCandidate(op)
    }

    if(match(TokenType.tok_op_minus)){
        advance()
        return new NegateExp(expression())
    }
    if(match(TokenType.tok_op_plus)){
        advance()
        return step(prev)
    }

    if(prev){
        if(!(prev instanceof BinaryExpCandidate)){
            return new BinaryExpCandidate(TokenType.tok_op_multiply)
        }
    }

    if (match(TokenType.tok_open)) {
        return brackets();
    }
    if(match(TokenType.tok_identifier)){
        let val = head()?.str||""
        advance()
        if(isFunction(val)){
            let typedFunctionTypeString = val as keyof typeof FunctionType;
            return new FunctionExp(step(), FunctionType[typedFunctionTypeString])
        }
        return new IdentifierExp(val)
    }
    let val = head()?.value || 0
    advance()
    return new NumberExp(val)
  }

  function maxIndexElement(acc: Exp[]){
    var tmp = acc.map(function(elem) {
        if(elem instanceof BinaryExpCandidate)
        return (elem as BinaryExpCandidate).priority;
        return 0;
      });
      var maxValue = Math.max.apply(Math, tmp);
      //find the index using the tmp array, need to convert maxValue to a string since value is of type string
      return tmp.indexOf(maxValue);
  }

  function expression(){
    let exp = null
    let array: Exp[] = []
    while(!match(TokenType.tok_eof) && !match(TokenType.tok_close) 
    ){
        array.push(step(array[array.length-1]))
    }
    while(array.length>1){
        const maxIndex = maxIndexElement(array)
        const item = array[maxIndex] as BinaryExpCandidate
        const left = array[maxIndex - 1]
        const right = array[maxIndex + 1]
        array.splice(maxIndex - 1, 3, new BinaryExp(left,right,item.op))
    }
    exp = array[0]
    if(exp){
        return exp
    }
    return new NumberExp(0)
}
  function brackets(){
    advance()
    let exp = expression()
    advance()
    return new BracketsExp(exp)
  }


export function parseProgram(program: string): Exp{
    tokens = tokenize(program)
    current = 0;
    return expression()
}


