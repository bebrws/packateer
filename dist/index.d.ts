import puppeteer from 'puppeteer';
import WebpackDevServer from 'webpack-dev-server';
interface ServerAndPupeteerObject {
    port: number;
    server: WebpackDevServer | null;
    browser: puppeteer.Browser | null;
    page: puppeteer.Page | null;
}
export declare function CreateServerAndClient(portToListenOn?: undefined, browserIsHeadless?: boolean, entry?: undefined, modules?: string[], fullySpecifiedImports?: boolean, usingTypescript?: boolean): Promise<ServerAndPupeteerObject>;
export {};
//# sourceMappingURL=index.d.ts.map