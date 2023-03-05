import {BinaryExp, BracketsExp, IdentifierExp, NumberExp, parseProgram} from '../src/parser';
import { expect } from 'chai';
import 'mocha'
import { execute } from '../src';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Test index', () => {
  it('expect number token', () => {
    let exp = execute('2')
    expect(exp.res).to.equal(2);
  });

  it('expect indentifier token', () => {
    let exp = execute('x', {x: -3})
    expect(exp.res).to.equal(-3);
  });

  it('expect number token and tok_binary', () => {
    let exp = execute('2+x2', {x2: 2})
    expect(exp.res).to.equal(4);
  });
  it('expect number token and tok_binary', () => {
    let exp = execute('2+x2', {x2: 3})
    expect(exp.res).to.equal(5);
  });
});