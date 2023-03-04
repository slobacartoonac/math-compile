import { getNextToken, setInput, Token } from '../src/lexer';
import { expect } from 'chai';
import 'mocha';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Test lexer', () => {
    it('expect number token', () => {
        setInput('22+2');
        let tok = getNextToken();
        expect(tok).to.equal(Token.tok_number);
        tok = getNextToken();
        expect(tok).to.equal(Token.tok_binary);
        tok = getNextToken();
        expect(tok).to.equal(Token.tok_number);
        tok = getNextToken();
        expect(tok).to.equal(Token.tok_eof);
    });
});
//# sourceMappingURL=lexer.spes.js.map