import { Token, TokenType } from "./token";

export function tokenize(input: string): Token[] {
    input = input.replace(/\/\/[^\n]*/, '')
    const chars = input.split('')
    const tokens: Token[] = []

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]

        if (/\s/.test(char)) {
            continue;
        }

        if (char in simpleTokens) {
            tokens.push(simpleTokens[char])
        } else if (isNumeric(char)) {
            let buffer = char

            while (isNumeric(chars[i + 1])) {
                buffer += chars[i + 1];
                i++;
            }

            tokens.push(new Token(TokenType.Number, buffer))
        } else if (isAlphabetic(char)) {
            let buffer = char

            while (isAlphabetic(chars[i + 1]) || ['_', '-'].includes(chars[i + 1])) {
                buffer += chars[i + 1];
                i++;
            }

            if (buffer in keywords) {
                tokens.push(keywords[buffer]);
            } else {
                tokens.push(new Token(TokenType.Identifier, buffer));
            }
        } else if (char === '"') {
            let buffer = ''
            
            while (chars[i + 1] && chars[i + 1] !== '"') {
                buffer += chars[i + 1]
                i++
            }

            i++

            tokens.push(new Token(TokenType.String, buffer))
        } else if (char === '(' && chars[i + 1] === ')') {
            tokens.push(new Token(TokenType.Unit, '()'));
        }
    }

    return tokens
}

const simpleTokens: { [key: string]: Token } = {
    '=': new Token(TokenType.Equals, '='),
    ':': new Token(TokenType.Colon, ':'),
    ',': new Token(TokenType.Comma, ','),
    '{': new Token(TokenType.LeftBrace, '{'),
    '}': new Token(TokenType.RightBrace, '}'),
    '[': new Token(TokenType.LeftBracket, '['),
    ']': new Token(TokenType.RightBracket, ']'),
};

const keywords: { [key: string]: Token } = {
    'true': new Token(TokenType.True, 'true'),
    'false': new Token(TokenType.False, 'false'),
}

const isNumeric = (char: string): boolean => !isNaN(parseInt(char))
const isAlphabetic = (char: string): boolean => /[a-zA-Z]/.test(char)