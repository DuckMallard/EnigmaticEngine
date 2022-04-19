class RotorHandler {
    rotor: Rotor;
    offset: number;
    leftRotor: AdjacentRotor = null; // slow rotor
    rightRotor: AdjacentRotor = null; // fast rotor
    doStep: boolean;
    constructor(rotor: Rotor, offset: number) {
        this.rotor = rotor;
        this.offset = offset;
        this.doStep = (this.rotor.notch.includes(this.offset));
    }
    static applyRingTransform(rotor: Rotor, ringSetting: number) {
        let newWiring: number[] = [];
        for(let i = 0;i < 26;i++) {
            newWiring[i] = rotor.wiring[(ringSetting + rotor.wiring[i]) % 26] + ringSetting
        }
        return {wiring: newWiring, notch: rotor.notch};
    }
    step(): void {
        if(this.doStep) {
            this.offset = (this.offset + 1) % 26;
        }
    }
    update(): void {
        if(this.rightRotor) {
            this.doStep = false; 
         }
        if(this.rotor.notch.includes(this.offset)) {
            this.doStep = true;
            if(this.leftRotor) {
                this.leftRotor.doStep = true;
            }
        }
    }
    forwardPass(input: number): number {
        let index: number = (this.offset + input) % 26;
        index = this.rotor.wiring[index];
        return (-this.offset + index + 26) % 26;
    }
    backwardPass(input: number): number {
        let index: number = (this.offset + input) % 26;
        index = this.rotor.wiring.indexOf(index);
        return (-this.offset + index + 26) % 26;
    }
}