export type BrowserifyDeclarativeConf = {
    srcPath: string;
    tokensToReplace?: Record<string, any>;
    saveBundlePath?: string;
};
/**
 * Bundles script with all requirements use browserify
 * returns promise of result code string
 */
export declare function browserifyDeclarative(conf: BrowserifyDeclarativeConf): Promise<string>;
