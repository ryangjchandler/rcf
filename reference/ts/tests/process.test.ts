import { it, expect, assert } from 'vitest'
import { process } from '../src'

it('should process a config file correctly', () => {
    let result = process(`
        // This is a comment.
        name = "Ryan"
        age = 100
        active = false
        nothing = ()
        friends = ["Jane", "John"]
        address = {
            one: "1 Test Street",
            postcode: "TT1 1TT"
        }
    `)

    if (! result.ok) {
        throw result.error
    }

    let repository = result.value

    expect(repository.get('name')).toEqual('Ryan')
    expect(repository.get('age')).toEqual(100)
    expect(repository.get('active')).toEqual(false)
    expect(repository.get('nothing')).toBeNull()
    expect(repository.get('friends')).toEqual(["Jane", "John"])
    expect(repository.get('address')).toEqual({
        one: "1 Test Street",
        postcode: "TT1 1TT"
    })
})