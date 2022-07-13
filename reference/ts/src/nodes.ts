export type Node = AssignNode | LiteralNode;
export type LiteralNode = StringNode | NumberNode | BoolNode | ArrayNode | MapNode | UnitNode;
export type Identifier = string
export enum RcfType {
    String,
    Number,
    Bool,
    Unit,
    Array,
    Map,
    Any
}

export class AssignNode {
    public constructor(
        public readonly identifier: Identifier,
        public readonly value: LiteralNode,
        public readonly type: RcfType = RcfType.Any
    ) {}
}

export class UnitNode {
    
}

export class MapNode {
    public constructor(
        public readonly map: { [key: string]: LiteralNode },
    ) {}
}

export class ArrayNode {
    public constructor(
        public readonly values: LiteralNode[],
    ) {}
}

export class BoolNode {
    public constructor(
        public readonly value: boolean
    ) {}
}

export class StringNode {
    public constructor(
        public readonly literal: string
    ) {}
}

export class NumberNode {
    public constructor(
        public readonly value: number,
    ) {}
}