let {Enigma} = require(`../dist/Enigma.js`)

let machine = Enigma.fromInitVector({
    wheelOrder: [`I`, `II`, `III`],
    reflector: `Reflector_B`,
    ringSettings: [`B`, `B`, `B`],
    plugBoard: [],
    startPosition: [`A`, `A`, `A`],
    key: [`A`, `A`, `A`]
});
console.log(machine.getCipherText(`AAAAA`))