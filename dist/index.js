"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var path = __importStar(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
function TestReactJS(_a) {
    var _b = _a.portToListenOn, portToListenOn = _b === void 0 ? undefined : _b, _c = _a.serverListeningCallback, serverListeningCallback = _c === void 0 ? undefined : _c, _d = _a.browserIsHeadless, browserIsHeadless = _d === void 0 ? true : _d, _e = _a.entry, entry = _e === void 0 ? undefined : _e;
    return __awaiter(this, void 0, void 0, function () {
        function serverSetup() {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // server.listen(port, "localhost", serverListeningCallback || (() => {}));
                        return [4 /*yield*/, new Promise(function (res, rej) {
                                server.listen(port, "localhost", serverListeningCallback || (function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, page.goto("http://localhost:" + port)];
                                            case 1:
                                                _a.sent();
                                                res(true);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            })];
                        case 1:
                            // server.listen(port, "localhost", serverListeningCallback || (() => {}));
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var HtmlWebpackPluginConfig, compiler, server, port, browser, page;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    HtmlWebpackPluginConfig = new html_webpack_plugin_1.default({
                        template: path.join(__dirname, '../client/index.html'),
                        filename: 'index.html',
                        inject: 'body'
                    });
                    compiler = webpack_1.default({
                        name: 'test',
                        target: 'web',
                        mode: 'development',
                        entry: entry,
                        output: {
                            path: __dirname,
                            filename: 'test.js',
                            publicPath: '/'
                        },
                        module: {
                            rules: [{
                                    test: /\.ts$/,
                                    resolve: { fullySpecified: false },
                                    use: [{ loader: 'babel-loader',
                                            options: { presets: [
                                                    '@babel/preset-env', '@babel/preset-react'
                                                ],
                                                plugins: [
                                                    '@babel/plugin-syntax-jsx'
                                                ]
                                            } }, { loader: 'ts-loader', options: {
                                                compilerOptions: {
                                                    "target": "es5",
                                                    "module": "commonjs",
                                                    "jsx": "react",
                                                    "esModuleInterop": true,
                                                    "skipLibCheck": true,
                                                    "noEmit": false
                                                }
                                            } }],
                                },
                                {
                                    test: /\.tsx$/,
                                    resolve: { fullySpecified: false },
                                    use: [{ loader: 'babel-loader',
                                            options: { presets: [
                                                    '@babel/preset-env', '@babel/preset-react'
                                                ],
                                                plugins: [
                                                    '@babel/plugin-syntax-jsx'
                                                ]
                                            } }, { loader: 'ts-loader', options: {
                                                compilerOptions: {
                                                    "target": "es5",
                                                    "module": "commonjs",
                                                    "jsx": "react",
                                                    "esModuleInterop": true,
                                                    "skipLibCheck": true,
                                                    "noEmit": false
                                                }
                                            } }],
                                },
                                {
                                    test: /\.js$/,
                                    resolve: { fullySpecified: false },
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            '@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]
                                        ],
                                        plugins: [
                                            '@babel/plugin-syntax-jsx'
                                        ]
                                    }
                                },
                                {
                                    test: /\.jsx$/,
                                    resolve: { fullySpecified: false },
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            '@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]
                                        ],
                                        plugins: [
                                            '@babel/plugin-syntax-jsx'
                                        ]
                                    }
                                },
                                {
                                    test: /\.css$/,
                                    use: ['css-loader']
                                },
                                {
                                    test: /\.(ttf|woff|woff2|eot|svg)$/,
                                    use: [{
                                            loader: 'file-loader',
                                            options: {}
                                        }]
                                }
                            ]
                        },
                        resolve: {
                            // fullySpecified: false,
                            extensions: ['.wasm', '.mjs', '.json', '.tsx', '.ts', '.js', '.jsx'],
                            modules: [path.join(__dirname, '../../../node_modules'), path.join(__dirname, '../../../src'), path.join(__dirname, '../../../')]
                        },
                        plugins: [HtmlWebpackPluginConfig],
                    });
                    server = new webpack_dev_server_1.default(compiler, {
                        stats: {
                            colors: true
                        }
                    });
                    port = portToListenOn || (3000 + Math.floor(Math.random() * Math.floor(1000)));
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: Boolean(browserIsHeadless) })];
                case 1:
                    browser = _f.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _f.sent();
                    return [2 /*return*/, { serverSetup: serverSetup, port: port, server: server, browser: browser, page: page }];
            }
        });
    });
}
exports.default = TestReactJS;
//# sourceMappingURL=index.js.map