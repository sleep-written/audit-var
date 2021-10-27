# Audit-VAR

This package analize the structure of objects or primitives according to a template provided. It was created as a standard mechanism to validate the body of an http request (using [Express.js](https://www.npmjs.com/package/express)).


## Installation

Execute this command (and that's it!):
```
npm i --save audit-var
```

## How it works

Let's imagine that you have an __express.js__ project, for example:
```ts
import express from 'express';
import { json, urlencoded } from 'body-parser';

// Configure express instance
const app = express();
app.use(json({
    strict: false,
    type: "application/vnd.api+json",
    limit: "1024mb"
}));
app.use(urlencoded({
    extended: false
}));

// An interface describing the incoming data
interface Body {
    id: number;
    cod: string;
    descript: string;
    userIds: number[];
}

// Create an endpoint
app.post('/new', (req, res) => {
    // Getting the body of the request
    const body = req.body as Body;

    // More irrelevant stuff here
    // bla bla bla bla
});

// Initialize the connection
app.listen(80, () => {
    console.clear();
    console.log('App ready, listening...);
})
```

Check that part where we create the endpoint `/new`. We assume that the body of the request has the structure declared with the interface `Body`. But if somewhere tries to send a body with a different structure, that could broke your endpoint, or generate an unexpected internal state...

A typical solution for that is validate every property one by one. That's simple with small objects like this example. But in cases where the incoming object it's huge, apli a validation for every property it's painful.

This library helps in those escenarios. Let's check again that endpoint:
```ts
// I assume that the body will have this structure
interface Body {
    id: number;
    cod: string;
    descript: string;
    userIds: number[];
}

// The endpoint
app.post('/new', (req, res) => {
    // Getting the body of the request
    const body = req.body as Body;

    // bla bla bla bla
    // bla bla bla bla
});
```

To apply validations to that body, we will use some audit classes to declare the expected body structure:
```ts
// Import dependencies
import { AuditArray, AuditObject, AuditNumber, AuditString } from 'audit-var';

// The structure of the body expected
interface Body {
    id: number;
    cod: string;
    descript: string;
    userIds: number[];
}

// Declare the data structure of the incoming body
const auditor = new AuditObject<Body>({
    keys: {
        id: new AuditNumber(),
        cod: new AuditString(),
        descript: new AuditString(),
        userIds: new AuditArray<number>({
            items: new AuditNumber()
        })
    }
});

// The endpoint
app.post('/new', (req, res) => {
    try {
        // Audit the body
        const body = auditor.audit(req.body);

        // bla bla bla bla
        // bla bla bla bla
    } catch (err as any) {
        // Sends an JSON with the error
        res.json({ message: err.message });
    }
});
```

If the object body doesn't match with the declared structure, the Audit classes will emit an error. Combined with a try/catch block you can return an error to the frontend user.

## Audit Classes

This library has some classes to audit several type of data. These classes are:

### `AuditBoolean`

This class audits `boolean` data type. Its constructor receives optionally an object with this options:

- **default** _(optional)_ [`boolean`] - If the incoming value is `null` or `undefined`, that value will be replaced with this value.


### `AuditString`
This class audits `string` data type. Its constructor receives optionally an object with this options:

- **default** _(optional)_ [`string`] - If the incoming value is `null` or `undefined`, that value will be replaced with this value.

- **trim** _(optional)_ [`boolean`] - If is `true`, the incoming string will be trimmed before check its length.

- **min** _(optional)_ [`number`] - Sets the minimum length allowed of the incoming data.

- **max** _(optional)_ [`number`] - Sets the maximum length allowed of the incoming data.

- **cut** _(optional)_ [`boolean`] - If is true and the incoming string is larger than the maximum length allowed, the output string will be cutted to adjust its length equals to the maximum setting.


### `AuditNumber`
This class audits `number` data type. Its constructor receives optionally an object with this options:

- **default** _(optional)_ [`number`] - If the incoming value is `null` or `undefined`, that value will be replaced with this value.

- **min** _(optional)_ [`number`] - Sets the minimum length allowed of the incoming data.

- **max** _(optional)_ [`number`] - Sets the maximum length allowed of the incoming data.

- **limit** _(optional)_ [`boolean`] - If is `true` and the incoming value it's out of range (established with the properties `min` and `max`), the incoming number will be adjusted inside to this limits.


### `AuditObject`
This class audits any object that contains enumerable properties. Its constructor receives an object with this options

- **keys** [`Record<string, any audit class>`] - Properties to audit. For example:

```ts
// We will convert this interface...
interface Reference {
    id: number;
    name: string;
}

// ...into this:
const auditor = new AuditObject<Reference>({
    keys: {
        id:     new AuditNumber(),
        name:   new AuditString()
    }
});
```

- **strict** _(optional)_ [`boolean`] - If is `true`, the Audit function will checks if the incoming object has exactly the same properties declared. If the incoming object has at least one property more than the expected properties, the audit function will throws an error.


### `AuditArray`
This class audits `array` instances. Its constructor receives an object with this options:

- **items** [`any audit class`] - An audit object instance to apply for all items in the array. For example:
```ts
// Our incoming object will be an array of this:
interface Reference {
    id: number;
    name: string;
}

// ...and this is its auditory:
const auditor = new AuditArray({
    // Every member of the array will be audited by this:
    items: new AuditObject<Reference>({
        id:     new AuditNumber(),
        name:   new AuditString()
    })
});
```

- **min** _(optional)_ [`number`] - he minimum length accepted by the audit object.

- **max** _(optional)_ [`number`] - The maximum length accepted by the audit object.

- **cut** _(optional)_ [`boolean`] - If this option is `true` and the incoming string are more long than the option `max`, the output string will be cutted to obtain the same length that the `max` length indicated.

### `AuditNull`

This class allows to receive `null` or `undefined` values. Its constructor receives an Audit class, and a optional character for strict mode:

```ts
// Our incoming object will be an array of this:
interface Reference {
    id: number;
    name: string;
}

// ...and this is its auditory:
const auditor = new AuditArray({
    // Every member of the array will be audited by this:
    items: new AuditObject<Reference>({
        id:     new AuditNull(new AuditNumber()),
        name:   new AuditString()
    })
});
```