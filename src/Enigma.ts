import {rotors} from "./Components/rotorConfig";
import {reflectors} from "./Components/reflectorConfig";
import {RotorHandler} from "./Components/RotorHandler";
import {ReflectorHandler} from "./Components/ReflectorHandler";
import {PlugBoardHandler} from "./Components/PlugBoardHandler";
import {InitVector} from "./Components/InitVector";
import {Rotor} from "./Components/Rotor";

class Enigma {
    rotors: RotorHandler[];
    reflector: ReflectorHandler;
    plugBoard: PlugBoardHandler;
    constructor(rotors: RotorHandler[], reflector: ReflectorHandler, plugBoard: PlugBoardHandler) {
        this.rotors = rotors;
        this.reflector = reflector;
        for(let i = 0;i < this.rotors.length - 1;i++) { 
            this.rotors[i].rightRotor = this.rotors[i+1];
        }
        for(let i = 1;i < this.rotors.length;i++) {
            this.rotors[i].leftRotor = this.rotors[i-1];
        }
        this.rotors[this.rotors.length - 1].doStep = true;
        this.plugBoard = plugBoard;
    }
    #getCipherChar(char: string): string {
        let index: number = char.charCodeAt(0) - 65;
        index = this.plugBoard.encode(index);
        for(let i = 0;i < this.rotors.length;i ++) {
            this.rotors[i].step();
        }
        for(let i = 0;i < this.rotors.length;i ++) {
            this.rotors[i].update();
        }
        for(let i = this.rotors.length - 1;i >= 0;i --) {
            index = this.rotors[i].forwardPass(index);
        }
        index = this.reflector.pass(index);
        for(let i = 0;i < this.rotors.length;i ++) {
            index = this.rotors[i].backwardPass(index);
        }
        index = this.plugBoard.encode(index);
        return String.fromCharCode(65 + index);
    }
    getCipherText(str: string): string {
        let cipherText: string = ``;
        for(let i = 0;i < str.length;i++) {
            cipherText+= this.#getCipherChar(str[i]);
        }
        return cipherText;
    }
    static fromInitVector(initVector: InitVector): Enigma {
        let _rotors: Rotor[] = initVector.wheelOrder.map((wheelType) => rotors[wheelType]);
        let _rotorHandlers: RotorHandler[] = _rotors.map((_rotor, i) => 
            new RotorHandler(RotorHandler.applyRingTransform(_rotor, (initVector.ringSettings[i].charCodeAt(0) - 65)), (initVector.startPosition[i].charCodeAt(0) - 65))
        )
        let _reflector = new ReflectorHandler(reflectors[initVector.reflector]);
        let _plugBoard = new PlugBoardHandler({plugs: initVector.plugBoard});
        return new Enigma(_rotorHandlers, _reflector, _plugBoard);
    }
}
export {Enigma} 