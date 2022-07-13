import { AssignNode, BoolNode, LiteralNode, NumberNode, StringNode, Node, ArrayNode, MapNode, UnitNode } from "./nodes"
import { RcfMap, RcfValue, Repository, RepositoryStore } from "./repo"

export function compile(ast: Node[]): Repository {
    const properties: RepositoryStore = {}

    ast.forEach(node => {
        if (node instanceof AssignNode) {
            const property = node.identifier
            const value = compileLiteralNode(node.value)

            properties[property] = value
        }
    })

    return new Repository(properties)
}

function compileLiteralNode(node: LiteralNode): RcfValue {
    if (node instanceof StringNode) {
        return node.literal
    }
    
    if (node instanceof NumberNode) {
        return node.value
    }
    
    if (node instanceof BoolNode) {
        return node.value
    }

    if (node instanceof ArrayNode) {
        return node.values.map(value => compileLiteralNode(value))
    }

    if (node instanceof UnitNode) {
        return null
    }

    if (node instanceof MapNode) {
        const map: RcfMap = {}
        Object.entries(node.map).forEach(([key, value]) => {
            map[key] = compileLiteralNode(value)
        })
        return map
    }

    throw new Error('Unable to compile literal node.')
}