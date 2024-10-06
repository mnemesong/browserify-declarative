# browserify-declarative
Declarative API for browserify bundling and code injection


## Example

```javascript
//File test-code2.js

function addExpression(s) {
    return s + "!";
}
exports.addExpression = addExpression;
```

```javascript
//File test-code.js

var test_code2_1 = require("./test-code2");

console.log("bundled script executing..");

var m2 = "MY_MARK_2"; //token to replace in code..
exports.result = { m1: (0, test_code2_1.addExpression)("MY_MARK_1") }; //here another one
exports.result.m2 = m2;
exports.result.m3 = "MY_MARK_3"; //and another one

console.log(exports.result);
```

```typescript
//Code - bundling them

const targetFilePath = path
        .resolve(module.path, "..", "..", "test-result", "test-result.js")

browserifyDeclarative({
    srcPath: path.resolve(module.path, "index", "test-code.js"),
    tokensToReplace: {
        MY_MARK_1: "inserted",
        MY_MARK_2: {inserted: true},
        MY_MARK_3: ["inserted", {inserted: true}],
        NOT_EXISTS_MARK: "not exists",
    },
    saveBundlePath: targetFilePath
})
````

In result of bundling we will have file "test-result.js".
On execution it we willl get output:
```bash
> node ./test-result/test-result

bundled script executing..
{
  m1: 'inserted!',
  m2: { inserted: true },
  m3: [ 'inserted', { inserted: true } ]
}
```


## API
```typescript
// indes.d.ts

//Config of bundling
export type BrowserifyDeclarativeConf = {
    srcPath: string;
    tokensToReplace?: Record<string, any>;
    saveBundlePath?: string;
};

/**
 * Bundles script with all requirements use browserify
 */
export declare function browserifyDeclarative(
    conf: BrowserifyDeclarativeConf
): Promise<string>; //returns promise of result code string
```


## License
MIT


## Author
Anatoly Starodubtsev
tostar74@mail.ru