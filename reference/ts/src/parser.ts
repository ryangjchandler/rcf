import { AssignNode, BoolNode, LiteralNode, Node, NumberNode, StringNode, ArrayNode, MapNode, RcfType, UnitNode } from './nodes'
import { Token, TokenType } from './token'

export function parse(tokens: Token[]): Node[] {
    const nodes: Node[] = []

    for (let i = 0; i < tokens.length;) {
        const current = (): Token => tokens[i]
        const peek = (): Token|undefined => tokens[i + 1]

        const expect = (...type: TokenType[]): Token => {
            if (! tokens[i] || ! type.includes(tokens[i].type)) {
                throw new Error(`Unexpected token ${tokens[i].literal}.`);
            }

            i++

            return tokens[i - 1]
        }

        const parseLiteral = (): LiteralNode => {
            const t = tokens[i]

            if (t.type === TokenType.String) {
                i++

                return new StringNode(t.literal)
            }

            if (t.type === TokenType.Number) {
                i++

                return new NumberNode(parseFloat(t.literal))
            }

            if (t.type === TokenType.True) {
                i++

                return new BoolNode(true)
            }

            if (t.type === TokenType.False) {
                i++

                return new BoolNode(false)
            }

            if (t.type === TokenType.LeftBrace) {
                i++

                const values: { [key: string]: LiteralNode } = {}

                while (current() && current().type !== TokenType.RightBrace) {
                    if (! [TokenType.Identifier, TokenType.String].includes(current().type)) {
                        throw new Error('Keys in a map must be either identifiers or strings.')
                    }

                    const key = expect(TokenType.Identifier, TokenType.String).literal

                    expect(TokenType.Colon)

                    const value = parseLiteral()

                    if (current().type === TokenType.Comma) {
                        expect(TokenType.Comma)
                    }

                    values[key] = value
                }

                expect(TokenType.RightBrace)

                return new MapNode(values)
            }

            if (t.type === TokenType.LeftBracket) {
                i++

                const values: LiteralNode[] = []

                while (current() && current()?.type !== TokenType.RightBracket) {
                    const value = parseLiteral();

                    if (current()?.type === TokenType.Comma) {
                        expect(TokenType.Comma)
                    }

                    values.push(value)
                }

                expect(TokenType.RightBracket);

                return new ArrayNode(values)
            }

            if (t.type === TokenType.Unit) {
                i++

                return new UnitNode
            }

            throw new Error('Unhandled token when parsing literal: ' + t.literal)
        }

        const parseType = (): RcfType => {
            const t = current();

            i++;

            if (t.type === TokenType.Unit) {
                return RcfType.Unit
            }

            if (t.literal === 'String') {
                return RcfType.String
            }

            if (t.literal === 'Number') {
                return RcfType.Number
            }

            if (t.literal === 'Bool') {
                return RcfType.Bool
            }

            if (t.literal === 'Array') {
                return RcfType.Array
            }

            if (t.literal === 'Map') {
                return RcfType.Map
            }

            throw new Error('Unrecognised type.');
        }

        const { type, literal } = tokens[i]

        if (type === TokenType.Identifier) {
            const property = literal

            i++
        
            let type = RcfType.Any;
            if (current().type === TokenType.Colon) {
                expect(TokenType.Colon);

                type = parseType();
            }

            expect(TokenType.Equals);

            const value = parseLiteral();

            nodes.push(new AssignNode(property, value, type))
        }
    }

    return nodes
}

