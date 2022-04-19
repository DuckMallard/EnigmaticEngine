"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectorHandler = void 0;
class ReflectorHandler {
    constructor(reflector) {
        this.reflector = reflector;
    }
    pass(input) {
        return this.reflector.wiring[input];
    }
}
exports.ReflectorHandler = ReflectorHandler;
