class PlugBoardHandler {
    constructor(plugBoard) {
        this.plugBoard = plugBoard;
        for (let i = 0; i < 26; i++) {
            this.wiring[i] = i;
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
