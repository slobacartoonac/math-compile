import { TokenType, Token, tokenize} from './lexer';

let tokens: Token[];
let current = 0;
function advance(){
    current++
    if(tokens.length <= current){
        current = tokens.length -1
        return new Token(TokenType.tok_eof,0,0)
    }
    return tokens[current]
}
function head(): Token{
    return tokens[current]
}
function match(_type: TokenType){
    return head().tokenType === _type
}

function isOperation(){
    return [TokenType.tok_op_plus,
    TokenType.tok_op_minus,
    TokenType.tok_op_multiply ,
    TokenType.tok_op_devide,
    TokenType.tok_op_power,
    TokenType.tok_op_modulo].includes(head().tokenType)
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



function step(exp?: Exp): Exp {
    if(match(TokenType.tok_eof) || match(TokenType.tok_close)){
        return exp
    }
    if(exp && isOperation()){
        var op = head().tokenType
        advance()
        return new BinaryExp(exp, expression(), op)
    }
    if (match(TokenType.tok_open)) {
      return brackets();
    }
    if(match(TokenType.tok_op_minus)){
        return new NegateExp(expression())
    }
    if(match(TokenType.tok_op_plus)){
        advance()
        return step(exp)
    }
    if(match(TokenType.tok_identifier)){
        return new IdentifierExp(head()?.str||"")
    }
    return new NumberExp(head()?.value||0)
  }

  function expression(){
    let exp = null
    while(!match(TokenType.tok_eof) 
    && !match(TokenType.tok_close)
    ){
        exp = step(exp)
        advance()
    }
    if(!exp){
        return new NumberExp(0)
    }
    return exp
}
  function brackets(){
    advance()
    let exp = expression()
    advance()
    return new BracketsExp(exp)
  }


export function parseProgram(program: string){
    tokens = tokenize(program)
    current = 0;
    return expression()
}


