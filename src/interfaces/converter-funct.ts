import { Path } from './path';
import { Types } from './types';

export type converterFunct<T extends Types> = (
    definition: T,
    target: any,
    path: Path,
) => any;
