type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type WheelType = `I`|`II`|`III`|`IV`|`V`|`VI`|`VII`|`VIII`;
type StartPosition = TupleOf<AlphabetChar, 3> | null;

type InitVector = {
    wheelOrder: TupleOf<WheelType, 3>;
    reflector: `Beta`|`Gamma`|`Reflector_A`|`Reflector_B`|`Reflector_C`|`Reflector_B_Thin`|`Reflector_C_Thin`|`ETW`;
    ringSettings: TupleOf<AlphabetChar, 3>; 
    plugBoard: Array<[AlphabetChar, AlphabetChar]>;
    startPosition: StartPosition;
    key: TupleOf<AlphabetChar, 3>;
}