/**
 * An interface that describes a common auditable instance object.
 * @template Type The expected type of the variable to audit.
 * @template Options The type of the object that describes how the
 * audit object works.
 */
export interface Auditable<Type, Options> {
    get options(): Options;
    set options(v: Options);

    /**
     * Inspects the object given, If the audit ends successfully,
     * the incoming value will be returned, according the options are setted.
     * @param input The variable/constant do you want to validate.
     */
    audit(input: any): Type;
}
