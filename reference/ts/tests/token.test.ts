import { it, expect } from 'vitest'
import { Token, TokenType } from '../src'

it('can be constructed', () => {
    expect(new Token(TokenType.True, 'true')).toBeInstanceOf(Token)
})