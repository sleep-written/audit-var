export class KeyNotFoundError extends Error {
    constructor(key: string) {
        super(`The key "${key}" doesn't exists inside of the audited object.`);
    }
}
