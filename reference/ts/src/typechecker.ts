import { ArrayNode, AssignNode, BoolNode, LiteralNode, MapNode, Node, NumberNode, RcfType, StringNode, UnitNode } from "./nodes";

export function typecheck(ast: Node[]) {
    for (const node of ast) {
        if (! (node instanceof AssignNode)) {
            continue;
        }

        if (node.type === RcfType.Any) {
            continue;
        }

        const expected = node.type
        const actual = getTypeOfLiteral(node.value)

        if (expected !== actual) {
            throw new Error(`Property "${node.identifier}" must be of type ${RcfType[expected]}, got ${RcfType[actual]}`)
        }
    }
}

function getTypeOfLiteral(node: LiteralNode): RcfType {
    if (node instanceof StringNode) {
        return RcfType.String
    }

    if (node instanceof NumberNode) {
        return RcfType.Number
    }

    if (node instanceof BoolNode) {
        return RcfType.Bool
    }

    if (node instanceof ArrayNode) {
        return RcfType.Array
    }

    if (node instanceof MapNode) {
        return RcfType.Map
    }

    if (node instanceof UnitNode) {
        return RcfType.Unit
    }

    throw new Error('Unable to infer type of node.')
}