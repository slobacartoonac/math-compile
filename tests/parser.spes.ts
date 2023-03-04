import {BinaryExp, BracketsExp, IdentifierExp, NumberExp, parseProgram} from '../src/parser';
import { expect } from 'chai';
import 'mocha'
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

  it('expect number token and tok_binary', () => {
    let exp = parseProgram('2.2+x2')
    expect(exp instanceof BinaryExp).to.equal(true);
    expect((exp as BinaryExp).left instanceof NumberExp).to.equal(true);
    expect((exp as BinaryExp).right instanceof IdentifierExp).to.equal(true);
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
});