class RotorHandler {
    constructor(rotor, offset) {
        this.leftRotor = null;
        this.rightRotor = null;
        this.rotor = rotor;
        this.offset = offset;
        this.doStep = (this.rotor.notch.includes(this.offset));
    }
    static applyRingTransform(rotor, ringSetting) {
        let newWiring = [];
        for (let i = 0; i < 26; i++) {
            newWiring[i] = rotor.wiring[(ringSetting + rotor.wiring[i]) % 26] + ringSetting;
        }
        return { wiring: newWiring, notch: rotor.notch };
    }
    step() {
        if (this.doStep) {
            this.offset = (this.offset + 1) % 26;
        }
    }
    update() {
        if (this.rightRotor) {
            this.doStep = false;
        }
        if (this.rotor.notch.includes(this.offset)) {
            this.doStep = true;
            if (this.leftRotor) {
                this.leftRotor.doStep = true;
            }
        }
    }
    forwardPass(input) {
        let index = (this.offset + input) % 26;
        index = this.rotor.wiring[index];
        return (-this.offset + index + 26) % 26;
    }
    backwardPass(input) {
        let index = (this.offset + input) % 26;
        index = this.rotor.wiring.indexOf(index);
        return (-this.offset + index + 26) % 26;
    }
}
