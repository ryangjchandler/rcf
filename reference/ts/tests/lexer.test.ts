import { it, expect } from 'vitest'
import { Token, TokenType, tokenize } from '../src'

it('produces the correct tokens', () => {
    expect(tokenize('1 true false () name = : {} [] , "foo"'))
        .toEqual([
            new Token(TokenType.Number, '1'),
            new Token(TokenType.True, 'true'),
            new Token(TokenType.False, 'false'),
            new Token(TokenType.Unit, '()'),
            new Token(TokenType.Identifier, 'name'),
            new Token(TokenType.Equals, '='),
            new Token(TokenType.Colon, ':'),
            new Token(TokenType.LeftBrace, '{'),
            new Token(TokenType.RightBrace, '}'),
            new Token(TokenType.LeftBracket, '['),
            new Token(TokenType.RightBracket, ']'),
            new Token(TokenType.Comma, ','),
            new Token(TokenType.String, 'foo'),
        ])
})