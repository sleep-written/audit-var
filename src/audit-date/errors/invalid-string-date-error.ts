export class InvalidStringDateError extends Error {
    constructor(input?: string) {
        super();

        if (typeof input === 'string') {
            this.message = `The value "${input}" isn't a valid string date.`;
        } else {
            this.message = `The value given isn't a valid string date.`;
        }
    }
}
