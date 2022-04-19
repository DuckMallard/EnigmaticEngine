
class PlugBoardHandler {
    plugBoard: PlugBoard;
    wiring: number[];
    constructor(plugBoard: PlugBoard) {
        this.plugBoard = plugBoard;
        for(let i = 0;i < 26;i++) {
            this.wiring[i] = i;
        }
        this.plugBoard.plugs.forEach(([a, b]) => {
            this.wiring[a] = b;
            this.wiring[b] = a;
        })
    }
    encode(input: number): number {
        return this.wiring[input];
    }
}