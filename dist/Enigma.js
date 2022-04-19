"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Enigma_instances, _Enigma_getCipherChar;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enigma = void 0;
const rotorConfig_1 = require("./Components/rotorConfig");
const reflectorConfig_1 = require("./Components/reflectorConfig");
const RotorHandler_1 = require("./Components/RotorHandler");
const ReflectorHandler_1 = require("./Components/ReflectorHandler");
const PlugBoardHandler_1 = require("./Components/PlugBoardHandler");
class Enigma {
    constructor(rotors, reflector, plugBoard) {
        _Enigma_instances.add(this);
        this.rotors = rotors;
        this.reflector = reflector;
        for (let i = 0; i < this.rotors.length - 1; i++) {
            this.rotors[i].rightRotor = this.rotors[i + 1];
        }
        for (let i = 1; i < this.rotors.length; i++) {
            this.rotors[i].leftRotor = this.rotors[i - 1];
        }
        this.rotors[this.rotors.length - 1].doStep = true;
        this.plugBoard = plugBoard;
    }
    getCipherText(str) {
        let cipherText = ``;
        for (let i = 0; i < str.length; i++) {
            cipherText += __classPrivateFieldGet(this, _Enigma_instances, "m", _Enigma_getCipherChar).call(this, str[i]);
        }
        return cipherText;
    }
    static fromInitVector(initVector) {
        let _rotors = initVector.wheelOrder.map((wheelType) => rotorConfig_1.rotors[wheelType]);
        let _rotorHandlers = _rotors.map((_rotor, i) => new RotorHandler_1.RotorHandler(RotorHandler_1.RotorHandler.applyRingTransform(_rotor, (initVector.ringSettings[i].charCodeAt(0) - 65)), (initVector.startPosition[i].charCodeAt(0) - 65)));
        let _reflector = new ReflectorHandler_1.ReflectorHandler(reflectorConfig_1.reflectors[initVector.reflector]);
        let _plugBoard = new PlugBoardHandler_1.PlugBoardHandler({ plugs: initVector.plugBoard });
        return new Enigma(_rotorHandlers, _reflector, _plugBoard);
    }
}
exports.Enigma = Enigma;
_Enigma_instances = new WeakSet(), _Enigma_getCipherChar = function _Enigma_getCipherChar(char) {
    let index = char.charCodeAt(0) - 65;
    index = this.plugBoard.encode(index);
    for (let i = 0; i < this.rotors.length; i++) {
        this.rotors[i].step();
    }
    for (let i = 0; i < this.rotors.length; i++) {
        this.rotors[i].update();
    }
    for (let i = this.rotors.length - 1; i >= 0; i--) {
        index = this.rotors[i].forwardPass(index);
    }
    index = this.reflector.pass(index);
    for (let i = 0; i < this.rotors.length; i++) {
        index = this.rotors[i].backwardPass(index);
    }
    index = this.plugBoard.encode(index);
    return String.fromCharCode(65 + index);
};
