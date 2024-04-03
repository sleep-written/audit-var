import type { Path } from './path.js';
import type { Types } from './types.js';

export type converterFunct<T extends Types> = (
    definition: T,
    target: any,
    path: Path,
) => any;
