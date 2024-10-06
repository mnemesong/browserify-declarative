import { describe, it } from "mocha"
import * as assert from "assert"
import { browserifyDeclarative } from "../src"
import path from "path"
import fs from "fs"

it("test browserifyDeclarative", async () => {
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
    }).then(code => {
        const fileContent = fs.readFileSync(targetFilePath).toString()
        assert.strictEqual(fileContent, code)
        assert.ok(!code.includes("MY_MARK_1"))
        assert.ok(!code.includes("MY_MARK_2"))
        assert.ok(!code.includes("MY_MARK_3"))
        assert.ok(!code.includes("NOT_EXISTS_MARK"))
        assert.ok(!code.includes("not exists"))

        assert.ok(code.includes("inserted"))
        assert.ok(code.includes("{inserted:true"))

        console.log("Success!!")
    })
})