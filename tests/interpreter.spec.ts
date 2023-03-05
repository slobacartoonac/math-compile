import {BinaryExp, BracketsExp, IdentifierExp, NumberExp, parseProgram} from '../src/parser';
import { expect } from 'chai';
import 'mocha'
import { evaluate } from '../src/interpreter';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Test interpreter', () => {
  it('expect number token', () => {
    let exp = parseProgram('2')
    expect(evaluate(exp)).to.equal(2);
  });

  it('expect indentifier token', () => {
    let exp = parseProgram('x2')
    expect(evaluate(exp, {x2: -3})).to.equal(-3);
  });

  it('expect number token and tok_binary', () => {
    let exp = parseProgram('2+x2')
    expect(evaluate(exp, {x2: 2})).to.equal(4);
  });


  it('expect negate', () => {
    let exp = parseProgram('-2')
    expect(evaluate(exp)).to.equal(-2);
  });

  it('expect multiply then add 1', () => {
    let exp = parseProgram('2+x2*2')
    expect(evaluate(exp, {x2: 2})).to.equal(6);
  });

  it('expect multiply then add 2', () => {
    let exp = parseProgram('3*x2+2')
    expect(evaluate(exp, {x2: 2})).to.equal(8);
  });

  it('expect brakets', () => {
    let exp = parseProgram('(2)')
    expect(evaluate(exp)).to.equal(2);
  });
  it('expect brakets binary', () => {
    let exp = parseProgram('(2+2)')
    expect(evaluate(exp)).to.equal(4);
  });
  it('expect brakets num binary', () => {
    let exp = parseProgram('(2)+x')
    expect(evaluate(exp, {x: 3})).to.equal(5);
  });

  it('expect brakets and numbers', () => {
    let exp = parseProgram('(x2-2)/2')
    expect(evaluate(exp, {x2: 4})).to.equal(1);
  });
  it('expect brakets and numbers and plus', () => {
    let exp = parseProgram('(x2-2)/2+1')
    expect(evaluate(exp, {x2: 4})).to.equal(2);
  });
  it('expect brakets and numbers and plus 4', () => {
    let exp = parseProgram('(x2-2)/2+x2*x1+2')
    expect(evaluate(exp, {x2: 4, x1: 3})).to.equal(15);
  });

  it('expect power', () => {
    let exp = parseProgram('x2**x1')
    expect(evaluate(exp, {x2: 3, x1: 2})).to.equal(9);
  });

  it('expect func sin', () => {
    let exp = parseProgram('sin x')
    expect(evaluate(exp, {x: 0})).to.equal(0);
    exp = parseProgram('sin x')
    expect(evaluate(exp, {x: Math.PI/2})).to.equal(1);
  });
  it('expect func cos', () => {
    let exp = parseProgram('cos x')
    expect(Math.abs(evaluate(exp, {x: Math.PI/2}))).to.lessThanOrEqual(0.0001);
    exp = parseProgram('cos x')
    expect(evaluate(exp, {x: 0})).to.equal(1);
  });

  it('expect E', () => {
    let exp = parseProgram('e')
    expect(Math.abs(evaluate(exp))).to.equal(Math.E);
    exp = parseProgram('Pi')
    expect(evaluate(exp)).to.equal(Math.PI);
  });

  it('expect func log and sqrt', () => {
    let exp = parseProgram('log x')
    expect(Math.abs(evaluate(exp, {x: 1}))).to.lessThanOrEqual(0);
    exp = parseProgram('sqrt 9')
    expect(evaluate(exp)).to.equal(3);
  });
});