class ReflectorHandler {
    reflector: Reflector;
    constructor(reflector: Reflector) {
        this.reflector = reflector;
    }
    pass(input: number): number {
        return this.reflector.wiring[input];
    }
}