import { Auditable } from './auditable';

/**
 * Gets the variable type that the Auditable class inspects. For example:
 * @example ```ts
 * // This type...
 * type auditType = AuditableType<AuditBoolean>;
 * 
 * // ...is the same as:
 * type auditType = boolean;
 * ```
 */
export type AuditableType<A extends Auditable<any, any>> = A extends Auditable<infer T, any> ? T: unknown;
