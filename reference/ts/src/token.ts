export class Token {
    public constructor(
        public readonly type: TokenType,
        public readonly literal: string,
    ) {}
}

export enum TokenType {
    Identifier,
    String,
    Number,
    True,
    False,
    Unit,
    Equals,
    Comma,
    Colon,
    LeftBracket,
    RightBracket,
    LeftBrace,
    RightBrace,
}