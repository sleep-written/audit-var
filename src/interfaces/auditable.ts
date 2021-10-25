import { CommonOptions } from './common-options';

export interface Auditable<Type, Options extends CommonOptions<Type>> {
    get options(): Options;
    set options(v: Options);

    /**
     * Inspects the object given, If the audit ends successfully,
     * the incoming value will be returned, according the options are setted.
     * @param input The variable/constant do you want to validate.
     */
    audit(input: any): Type;
}
