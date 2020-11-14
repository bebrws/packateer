import puppeteer from 'puppeteer';
import WebpackDevServer from 'webpack-dev-server';
interface TestReactJSArguments {
    portToListenOn?: number;
    serverListeningCallback?: () => void;
    browserIsHeadless?: boolean;
    entry?: string;
}
interface TestReactJSReturn {
    serverSetup: () => Promise<void>;
    port: number;
    server: WebpackDevServer;
    browser: puppeteer.Browser;
    page: puppeteer.Page;
}
export default function TestReactJS({ portToListenOn, serverListeningCallback, browserIsHeadless, entry }: TestReactJSArguments): Promise<TestReactJSReturn>;
export {};
//# sourceMappingURL=index.d.ts.map