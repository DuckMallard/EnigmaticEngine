class ReflectorHandler {
    constructor(reflector) {
        this.reflector = reflector;
    }
    pass(input) {
        return this.reflector.wiring[input];
    }
}
