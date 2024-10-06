import * as browserify from "browserify"

export type BrowserifyDeclarativeConf = {
    srcPath: string,
    tokensToReplace?: Record<string, any>, //substrings in code to replace (for data injection)
    saveBundlePath?: string //if anfter bundling needs to save file (with extension)
}

/**
 * Bundles script with all requirements use browserify
 * returns promise of result code string
 */
export function browserifyDeclarative(
    conf: BrowserifyDeclarativeConf
): Promise<string> {
    const b = browserify.default()
    return new Promise((resolve, reject) => {
        try {
            b.add(conf.srcPath)
                .bundle((err, src) => {
                    if(err) {
                        reject(err)
                        return undefined
                    }
                    if(src === undefined) {
                        reject("Source if undefined")
                        return undefined
                    }
                    let content = src.toString()
                    if(conf.tokensToReplace) {
                        content = Object.keys(conf.tokensToReplace).reduce(
                            (acc, el) => acc.split(JSON.stringify(el))
                                .join(JSON.stringify(conf.tokensToReplace[el])), 
                            src.toString()
                        )
                    }
                    if(conf.saveBundlePath) {
                        require("fs").writeFile(conf.saveBundlePath, content, (err) => {
                            if(!err) {
                                resolve(content)
                                return content
                            }
                            reject(err)
                        })
                    } else {
                        resolve(content)
                    }
                })
        } catch (e) {
            reject(e)
        }
    })
}
