export class NotSameKeysError extends Error {
    constructor(expected: string[], actual: string[]) {
        super(
                `The keys of the object audited in strict mode `
            +   `doesn't match with the declared at the constructor.`
        );

        this.message += `\nExpected Keys:\n`;
        this.message += this._reduce(expected);
        this.message += `\n\nActual Keys:\n`;
        this.message += this._reduce(actual);
        this.message += `\n`;
    }

    private _reduce(keys: string[]): string {
        let out = '';
        for (const key of keys) {
            if (out) {
                out += '\n';
            }

            out += ` - "${key}"`;
        }

        return out;
    }
}
