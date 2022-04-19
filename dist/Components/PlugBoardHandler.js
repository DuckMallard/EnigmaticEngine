"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlugBoardHandler = void 0;
class PlugBoardHandler {
    constructor(plugBoard) {
        this.wiring = [];
        this.plugBoard = plugBoard;
        for (let i = 0; i < 26; i++) {
            this.wiring.push(i);
        }
        this.plugBoard.plugs.forEach(([a, b]) => {
            this.wiring[a] = b;
            this.wiring[b] = a;
        });
    }
    encode(input) {
        return this.wiring[input];
    }
}
exports.PlugBoardHandler = PlugBoardHandler;
