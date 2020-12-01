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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServerAndClient = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var net = __importStar(require("net"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var checkIfPortInUse = function (port) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (res, rej) {
                var testServer = net.createServer().listen(port);
                testServer.on('error', function (e) {
                    if (e.code != 'EADDRINUSE') {
                        rej(e);
                    }
                    else {
                        res(true);
                    }
                });
                testServer.on('listening', function () {
                    testServer.close();
                });
                testServer.on('connection', function () {
                    testServer.close();
                });
                testServer.on('close', function () {
                    res(false);
                });
            })];
    });
}); };
function CreateServerAndClient(portToListenOn, browserIsHeadless, entry, modules, fullySpecifiedImports, usingTypescript) {
    if (portToListenOn === void 0) { portToListenOn = undefined; }
    if (browserIsHeadless === void 0) { browserIsHeadless = true; }
    if (entry === void 0) { entry = undefined; }
    if (modules === void 0) { modules = [path.join(__dirname, '../../../node_modules')]; }
    if (fullySpecifiedImports === void 0) { fullySpecifiedImports = false; }
    if (usingTypescript === void 0) { usingTypescript = false; }
    return __awaiter(this, void 0, void 0, function () {
        var getRandomPortNumber, port, isPortInUse, HtmlWebpackPluginConfig, typescriptModuleRules, compiler_1, server_1, page, browser, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRandomPortNumber = function () {
                        return 3000 + Math.floor(Math.random() * Math.floor(1000));
                    };
                    port = portToListenOn || getRandomPortNumber();
                    return [4 /*yield*/, checkIfPortInUse(port)];
                case 1:
                    isPortInUse = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!isPortInUse) return [3 /*break*/, 4];
                    port = getRandomPortNumber();
                    return [4 /*yield*/, checkIfPortInUse(port)];
                case 3:
                    isPortInUse = _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    if (!modules.some(function (m) { return !fs.existsSync(m); })) return [3 /*break*/, 5];
                    throw new Error("The modules property contains a path which does not exist. This may happen if for exammple this package is npm linked and the modules array is not updated.");
                case 5:
                    if (!!entry) return [3 /*break*/, 6];
                    throw new Error("Please provide a file to be used as the entry point for the test. This may be a file containing a call to ReactDom.render.");
                case 6:
                    HtmlWebpackPluginConfig = new html_webpack_plugin_1.default({
                        template: path.join(__dirname, '../client/index.html'),
                        filename: 'index.html',
                        inject: 'body'
                    });
                    typescriptModuleRules = [
                        {
                            test: /\.ts$/,
                            resolve: { fullySpecified: fullySpecifiedImports },
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-env', '@babel/preset-react'],
                                        plugins: ['@babel/plugin-syntax-jsx']
                                    }
                                },
                                {
                                    loader: 'ts-loader',
                                    options: {
                                        compilerOptions: {
                                            target: 'es5',
                                            module: 'commonjs',
                                            jsx: 'react',
                                            esModuleInterop: true,
                                            skipLibCheck: true,
                                            noEmit: false
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            test: /\.tsx$/,
                            resolve: { fullySpecified: fullySpecifiedImports },
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-env', '@babel/preset-react'],
                                        plugins: ['@babel/plugin-syntax-jsx']
                                    }
                                },
                                {
                                    loader: 'ts-loader',
                                    options: {
                                        compilerOptions: {
                                            target: 'es5',
                                            module: 'commonjs',
                                            jsx: 'react',
                                            esModuleInterop: true,
                                            skipLibCheck: true,
                                            noEmit: false
                                        }
                                    }
                                }
                            ]
                        }
                    ];
                    compiler_1 = webpack_1.default({
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
                            rules: __spreadArrays((usingTypescript ? typescriptModuleRules : []), [
                                {
                                    test: /\.js$/,
                                    resolve: { fullySpecified: fullySpecifiedImports },
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                                        plugins: ['@babel/plugin-syntax-jsx']
                                    }
                                },
                                {
                                    test: /\.jsx$/,
                                    resolve: { fullySpecified: fullySpecifiedImports },
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                                        plugins: ['@babel/plugin-syntax-jsx']
                                    }
                                },
                                {
                                    test: /\.css$/,
                                    use: ['css-loader']
                                },
                                {
                                    test: /\.(ttf|woff|woff2|eot|svg)$/,
                                    use: [
                                        {
                                            loader: 'file-loader',
                                            options: {}
                                        }
                                    ]
                                }
                            ])
                        },
                        resolve: {
                            modules: modules
                        },
                        plugins: [HtmlWebpackPluginConfig]
                    });
                    server_1 = null;
                    return [4 /*yield*/, new Promise(function (res, rej) {
                            server_1 = new webpack_dev_server_1.default(compiler_1, {
                                onListening: function (server) {
                                    res(null);
                                },
                                stats: {
                                    colors: true
                                }
                            });
                            server_1.listen(port, 'localhost', function (error) {
                                if (error) {
                                    console.error("Error occurred with WebPack server listening on port " + port + ".");
                                    throw error;
                                }
                            });
                        })];
                case 7:
                    _a.sent();
                    page = null;
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: Boolean(browserIsHeadless) })];
                case 8:
                    browser = _a.sent();
                    if (!browser) return [3 /*break*/, 13];
                    return [4 /*yield*/, browser.newPage()];
                case 9:
                    page = _a.sent();
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, page.goto("http://localhost:" + port)];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_1 = _a.sent();
                    console.error("Unable to use Puppetter page to goto URL for WebPackServer.");
                    throw e_1;
                case 13: return [2 /*return*/, { port: port, server: server_1, browser: browser, page: page }];
            }
        });
    });
}
exports.CreateServerAndClient = CreateServerAndClient;
//# sourceMappingURL=index.js.map