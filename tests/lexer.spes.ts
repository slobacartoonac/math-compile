import {getNextToken, IdentifierStr, NumVal, setInput, tokenize, TokenType} from '../src/lexer';
import { expect } from 'chai';
import 'mocha'
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Test lexer', () => {
  it('expect number token', () => {
    setInput('2')
    let tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_number);
    expect(2).to.equal(NumVal);
  });

  it('expect number token and tok_binary', () => {
    setInput('22+2.2')
    let tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_number);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_op_plus);
  });

  it('expect brakets and numbers', () => {
    setInput('(x2-2.2)\n/5')
    let tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_open);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_identifier);
    expect(IdentifierStr).to.equal('x2');
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_op_minus);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_number);
    expect(NumVal).to.equal(2.2);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_close);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_op_devide);
    tok = getNextToken();
    expect(tok).to.equal(TokenType.tok_number);
    expect(NumVal).to.equal(5);
  });
  it('expect brakets and numbers but as a whole', () => {
    let tokens = tokenize('(x2-2.2)\n/5')
    let tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_open);
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_identifier);
    expect(tok.str).to.equal('x2');
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_op_minus);
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_number);
    expect(tok.value).to.equal(2.2);
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_close);
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_op_devide);
    tok = tokens.shift();
    expect(tok.tokenType).to.equal(TokenType.tok_number);
    expect(tok.value).to.equal(5);
  });
});