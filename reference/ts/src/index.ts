export * from './token'
export * from './lexer'
import { compile } from './compiler'
import { tokenize } from './lexer'
import { Node } from './nodes'
import { parse } from './parser'
import { Repository } from './repo'
import { Token } from './token'
import { typecheck } from './typechecker'

export type ProcessResult<T, E = Error> = 
    | { ok: true, value: T }
    | { ok: false, error: E }

function Ok<T>(value: T): ProcessResult<T> {
    return { ok: true, value }
}

function Err<E = Error>(error: E): ProcessResult<any, E> {
    return { ok: false, error }
}

export function process(input: string, shouldTypecheck: boolean = true): ProcessResult<Repository> {
    let tokens: Token[]
    try {
        tokens = tokenize(input)
    } catch (e) {
        return Err(e as Error)
    }

    let ast: Node[]
    try {
        ast = parse(tokens)
    } catch (e) {
        return Err(e as Error)
    }

    if (shouldTypecheck) {
        try {
            typecheck(ast)
        } catch (e) {
            return Err(e as Error)
        }
    }

    let repo: Repository
    try {
        repo = compile(ast)
    } catch (e) {
        return Err(e as Error)
    }

    return Ok(repo)
}