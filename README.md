# audit-var

Validates the type and structure of an incoming object. It's specially useful to validate the incoming data in endpoints of an API Rest, or in any other escenario when it's possible to receive an unexpected potentially manipulated data from the requester.

This module works in __ESM__ projects (using _import_) and __CJS__ (using _require_) projects too.

## <a name='Contents'></a>Contents

<!-- vscode-markdown-toc -->
* [Contents](#Contents)
* [The problem](#Theproblem)
* [The solution](#Thesolution)
* [How to use](#Howtouse)
	* [Type `'boolean'`](#Typeboolean)
	* [Type `'string'`](#Typestring)
	* [Type `'number'`](#Typenumber)
	* [Type `'date'`](#Typedate)
	* [Type `'array'`](#Typearray)
	* [Type `'object'`](#Typeobject)
	* [Type `'record'`](#Typerecord)
	* [Type `'enum'`](#Typeenum)
* [Utilities](#Utilities)
	* [`this.structure`](#this.structure)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Theproblem'></a>The problem

Usually, when you make an endpoint (with express for example) you need to validate the incoming data before to modify your server state. In those cases, just the validation part taken a lot of space in your file, for example:

```ts
import express, { json } from 'express';

const app = express();
app.use(json({ strict: false }));

// An interface to declare the expected structure of the body
interface Body {
    id: number;
    text: string;
}

// The endpoint
app.get('/test', (req, res) => {
    // Validate manually the incoming object
    const body = req.body as Body;
    if (body == null) {
        throw new Error('invalid object!');
    }

    if (typeof body.id !== 'number') {
        throw new Error('id (typeof "number") expected!');
    } else if (body.id <= 0) {
        throw new Error('invalid id!');
    }

    if (typeof body.text !== 'string') {
        throw new Error('text (typeof "string") expected!');
    } else if (body.text.length < 10) {
        throw new Error('text minimum length = 10 chars!');
    }

    // Bla bla bla bla
    // Bla bla bla bla
    // Bla bla bla bla
});
```

## <a name='Thesolution'></a>The solution

With __audit-var__ you can apply the same validation in a less space. For example, taking the code of above and using __audit-var__, could be like this:

```ts
import express, { json } from 'express';
import { Auditor } from 'audit-var';

const app = express();
app.use(json({ strict: false }));

// Declare your auditor
const auditor = new Auditor({
    type: 'object',
    keys: {
        id:     { type: 'number', min:  1 },
        text:   { type: 'string', min: 10 },
    }
});

// The endpoint
app.get('/test', (req, res) => {
    // Checking if req.body meets the criteria settled
    // in the Auditor instance
    const body = auditor.audit(req.body);

    // Bla bla bla bla
    // Bla bla bla bla
    // Bla bla bla bla
});
```

## <a name='Howtouse'></a>How to use

To install this package, use this command:
```bash
npm i --save audit-var
```

The class `Auditor` makes all the job, you just must to import that class, and pass to the constructor an object that describes the type of data do you want to validate. The incoming objects compatibles with the `Auditor` class are:
- `'date'`.
- `'number'`.
- `'string'`.
- `'boolean'`.
- `'array'`.
- `'object'`.
- `'record'`.

As much as the __Array__, __Object__ and __Record__ types, both have support to nested arrays and objects. So with this approach you can declare complex structures as you need.

So, to declare the data expected, the `Auditor` class receives an object as parameter (implements `BaseType<T>` interface), like this:

```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    // The type of value expected
    type: 'string',

    // Defaults false
    optional: true,

    // Bla bla bla
    // Bla bla bla
    // Bla bla bla
});
```

First you need to set this parameters (defined in `BaseType<T>` interface):

- `type` _(required)_: __(read below)__;
    > Sets the type of data do you want to expect. __You can set any value described in [this list](#a-namehowtouseahow-to-use).__ When you sets this value, your code editor will shows the options available of the according type selected. If the incoming value doesn't match the type specified, the `Auditor` instance will throws an `InvalidTypeError` instance.

- `optional` _(optional)_: `boolean`;
    > By default this value is `false`. When this option is `false`, and the incoming value is `null` or `undefined`, the `Auditor` instance will throws an `NotOptionalError` instance. Otherwise, the method `auditor.audit(...);` will returns an undefined value either if the incoming value is `null` or `undefined`. 

These options are defined in `BaseType<T>` interface, so you must provide in the constructor an object that implements that interface. So, the object you can provide must be one of the following (these implements `BaseType<T>`):

### <a name='Typeboolean'></a>Type `'boolean'`

Boolean types doesn't have additional options. An example of usage:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'boolean',
    optional: true
});
```

### <a name='Typestring'></a>Type `'string'`

Options:
- `min` _(optional)_: `number`;
    > If the incoming string has a length __lower__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.
- `max` _(optional)_: `number`;
    > If the incoming string has a length __higher__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.
- `cut` _(optional)_: `boolean`;
    > If this option is enabled, when the length of the incoming string is longer than the `max` value settled, the output value will be cutted instead to throws an error.
- `trim` _(optional)_: `boolean`;
    > Trims the incoming string __before to make any length validation__.

Example:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'string',
    min: 4,
    max: 20,
    trim: true,
});
```

### <a name='Typenumber'></a>Type `'number'`

Options:
- `min` _(optional)_: `number`;
    > If the incoming value has __lower__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.
- `max` _(optional)_: `number`;
    > If the incoming value has __higher__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.

Example:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'number',
    min: 0,
    max: 999
});
```

### <a name='Typedate'></a>Type `'date'`

Options:
- `fromJSON` _(optional)_: `boolean`;
    > If this value is `true`, the `Auditor` instance will try to parse strings with a valid JSON Date format (like `'2022-12-31T03:00:00.000Z'`). If the convertion is sucessfull, the returned value will be a `Date` type, otherwise, the `Auditor` instance will throws an `InvalidJSONDateError` instance.

Example:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'date',
    fromJSON: true
});
```

### <a name='Typearray'></a>Type `'array'`

Options:
- `items` _(required)_: `BaseType<T>`;
    > With this option you can specify the structure of every item stored in the array, using the same options described in the past types described. __You can declare nested arrays, object arrays, or nested dictionaries too.__
- `min` _(optional)_: `number`;
    > If the incoming array has a length __lower__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.
- `max` _(optional)_: `number`;
    > If the incoming array has a length __higher__ than the value setted, the `Auditor` instance will throws an `WrongLengthError` instance.

Example 01 (array of `string`):
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'array',
    min: 10,
    max: 100,
    items: {
        type: 'string',
        min: 4
    }
});
```

Example 02 (array of `number[]`):
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'array',
    items: {
        type: 'array',
        min: 4,
        max: 4,
        items: {
            type: 'number',
            optional: true
        }
    }
});
```

Example 03 (array of `object`):
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'array',
    items: {
        type: 'object',
        keys: {
            id:     { type: number, min: 1 },
            name:   { type: string, min: 4 }
        }
    }
});
```

### <a name='Typeobject'></a>Type `'object'`

Options:
- `keys` _(required)_: `Record<string, BaseType<T>>`;
    > Defines the type of data expected for every key of the incoming object.

Example 01:
```ts
import { Auditor } from 'audit-var';

// The expected incoming object
interface Expected {
    id: number;
    name: string;
    active?: boolean;
}

// How to declare the Auditor instance
export const auditor = new Auditor({
    type: 'object',
    keys: {
        id:     { type: 'number', min: 1 },
        name:   { type: 'string', min: 4 },
        active: { type: 'boolean'. optional: true}
    }
});
```

Example 02 (nested objects):
```ts
import { Auditor } from 'audit-var';

// The expected incoming object
interface Incoming {
    id: number;
    config: {
        path: string;
        silent?: boolean;
    }
    data: {
        id: number;
        value: string;
    }
}

// How to declare the Auditor instance
export const auditor = new Auditor({
    type: 'object',
    keys: {
        id:     { type: 'number', min: 1 },
        config:   {
            type: 'object',
            keys: {
                path:   { type: 'string' },
                silent: { type: 'boolean', optional: true }
            }
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                keys: {
                    id:     { type: 'number' },
                    value:  { type: 'string' }
                }
            }
        }
    }
});
```

### <a name='Typerecord'></a>Type `'record'`
Options:
- `items` _(required)_: `BaseType<T>`;
    > With this option you can specify the structure of every item stored for each key inside of the object, using the same options described in the past types described. __You can declare nested arrays, object arrays, or nested dictionaries too.__

    ```ts
    import { Auditor } from 'audit-var';
    
    // The incoming data
    const target = {
        joder: { id: 666, nick: 'ghostlug' },
        shavo: { id: 666, nick: 'dir en grey' },
    };

    // The auditor 
    const auditor = new Auditor({
        type: 'record',
        items: {
            type: 'object',
            keys: {
                id: { type: 'number' },
                nick: { type: 'string' }
            }
        }
    });
    ```


### <a name='Typeenum'></a>Type `'enum'`
The `'enum'` type allows for the validation of values against a predefined set of allowed values. This set can include primitives (such as strings and numbers), arrays, objects, or even dates, providing flexibility for different validation scenarios. The `'enum'` type ensures the value being validated exactly matches one of the values in the specified set.

Options:
-   `values` _(required)_: `Array<any>`;
    >   An array containing the valid values for the enum. The values can be of any type, allowing for the validation of complex structures and data types.

-   `optional` _(optional)_: `boolean`;
    >   By default, this value is `false`. When set to `true`, and the incoming value is `null` or `undefined` (and those values are not explicitly included in the `values` array), the `Auditor` instance will return `undefined`. This behavior allows fields to be omitted without causing validation errors. If `optional` is set to `false` and the incoming value is either `null`, `undefined`, or not included in the `values` array, the `Auditor` instance will throw an error, enforcing strict presence and value validation.

Example with primitive values:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'enum',
    values: ['active', 'inactive', 'pending'] as const,
    optional: true
});
```

Example with objects:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'enum',
    values: [
        { status: 'active', code: 1 },
        { status: 'inactive', code: 2 }
    ] as const
});
```

Example with arrays:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'enum',
    values: [
        [1, 2, 3],
        ['a', 'b', 'c']
    ] as const
});
```

Example with dates:
```ts
import { Auditor } from 'audit-var';

export const auditor = new Auditor({
    type: 'enum',
    values: [
        new Date('2023-01-01T00:00:00.000Z'),
        new Date('2023-12-31T23:59:59.999Z')
    ] as const
});
```

## <a name='Utilities'></a>Utilities
### <a name='this.structure'></a>`this.structure`
Gets the actual structure of the current instance. Whith this you attach them to another more complex instance.

```ts
const auditorChild = new Auditor({
    type: 'object',
    keys: {
        id:     { type: 'number', min: 1 },
        text:   { type: 'string' }
    }
});

const auditorParent = new Auditor({
    type: 'object',
    keys: {
        objA: auditor.child.structure,
        objB: auditor.child.structure,
    }
});
```