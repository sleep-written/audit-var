export type ItemOfArray<T> = T extends Array<infer U>
    ?   U
    :   never;
