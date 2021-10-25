export interface Auditable<T> {
    audit(input: any): T;
}
