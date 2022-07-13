export type RcfValue = string | number | boolean | null | RcfValue[] | RcfMap;
export type RcfMap = { [key: string]: RcfValue }
export type RepositoryStore = { [name: string]: RcfValue }

export class Repository {
    public constructor(
        protected readonly properties: RepositoryStore,
    ) {}

    public get(key: string): RcfValue {
        return this.properties[key]
    }

    public has(key: string): boolean {
        return this.get(key) !== undefined
    }

    public all(): RepositoryStore {
        return this.properties
    }
}