import { process as generate } from "../src";
import repl from 'repl'

const INPUT = `
// This is a comment!
name = "Ryan"
age = 100
active = false
ages = [1, 2, 3]
names = ["Ryan", "Jane", "John"]
mix = [1, "Ryan", 2, ["Cool"]]
people = [
    { name: "Ryan" }
]

foo: Array = { cool: true }
`

const repo = generate(INPUT, process.argv.includes('-t'))

if (! repo.ok) {
    console.error(repo.error)
    process.exit(1)
}

const r = repl.start('rcf > ');

for (const k in repo.value.all()) {
    Object.defineProperty(r.context, k, {
        configurable: false,
        enumerable: true,
        value: repo.value.all()[k]
    })
}