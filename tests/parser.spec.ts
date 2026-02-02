import {BinaryExp, BracketsExp, FunctionExp, FunctionType, IdentifierExp, NegateExp, NumberExp, parseProgram, getIndentifierTokens} from '../src/parser';
import { expect } from 'chai';
import 'mocha'
import { TokenType } from '../src/lexer';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Test parser', () => {
  it('expect number token', () => {
    let exp = parseProgram('2')
    expect(exp instanceof NumberExp).to.equal(true);
    expect((exp as NumberExp).value).to.equal(2);
  });

  it('expect indentifier token', () => {
    let exp = parseProgram('x2')
    expect(exp instanceof IdentifierExp).to.equal(true);
    expect((exp as IdentifierExp).value).to.equal('x2');
  });

  it('expect implicit multiply', () => {
    let exp = parseProgram('2x')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof NumberExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof IdentifierExp).to.equal(true);
  });

  it('expect number token and tok_binary', () => {
    let exp = parseProgram('2.2+x2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof NumberExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof IdentifierExp).to.equal(true);
  });

  it('expect unarry number token', () => {
    let exp = parseProgram('-2')
    expect(exp instanceof NegateExp).to.equal(true);
    expect((exp as NegateExp).expression instanceof NumberExp).to.equal(true);
  });

  it('expect multiply then add 1', () => {
    let exp = parseProgram('2.2+x2*2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof NumberExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof BinaryExp).to.equal(true);
  });

  it('expect multiply then add 2', () => {
    let exp = parseProgram('2.2*x2+2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof NumberExp).to.equal(true);
  });
  it('expect multiply twice is power', () => {
    let exp = parseProgram('3**2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).op).to.equal(TokenType.tok_op_power);
  });

  it('expect func call', () => {
    let exp = parseProgram('sin 2')
    expect(exp instanceof FunctionExp).to.equal(true);
    expect((exp as FunctionExp).func).to.equal(FunctionType.sin);
    expect((exp as FunctionExp).expression instanceof NumberExp).to.equal(true);
  });

  it('expect brakets', () => {
    let exp = parseProgram('(2)')
    expect(exp instanceof BracketsExp).to.equal(true);
    expect((exp as BracketsExp).expression instanceof NumberExp).to.equal(true);
  });
  it('expect brakets binary', () => {
    let exp = parseProgram('(2+2)')
    expect(exp instanceof BracketsExp).to.equal(true);
    expect((exp as BracketsExp).expression instanceof BinaryExp).to.equal(true);
  });
  it('expect brakets num binary', () => {
    let exp = parseProgram('(2)+x')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof BracketsExp).to.equal(true);
  });

  it('expect brakets and numbers', () => {
    let exp = parseProgram('(x2-2.2)/5')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof BracketsExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof NumberExp).to.equal(true);
  });

  it('expect random exp', () => {
    let exp = parseProgram('x**-')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof IdentifierExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof NegateExp).to.equal(true);
  });
  it('expect factorial function', () => {
    let exp = parseProgram('x!')
    expect(exp instanceof FunctionExp).to.equal(true);
    expect((exp as FunctionExp).expression instanceof IdentifierExp).to.equal(true);
  });
  it('expect factorial function combinate binarry', () => {
    let exp = parseProgram('x+x!*2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof IdentifierExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof BinaryExp).to.equal(true);
    expect(((exp as BinaryExp).right as BinaryExp).left instanceof FunctionExp).to.equal(true);
  });
  it('expect indentifier tokens', () => {
    let idents = getIndentifierTokens('2 + x - sin(y) + z3 * ab');
    expect(idents).to.deep.equal(['x', 'y', 'z3', 'ab']);
  });
});