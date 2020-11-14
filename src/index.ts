import puppeteer from 'puppeteer';

import * as path from 'path';
import * as fs from 'fs';

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

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

export default async function TestReactJS({portToListenOn = undefined, serverListeningCallback = undefined, browserIsHeadless = true, entry = undefined}: TestReactJSArguments): Promise<TestReactJSReturn> {
    const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
        template: path.join(__dirname, '../client/index.html'),
        filename: 'index.html',
        inject: 'body'
        })
        
        const compiler = Webpack({
        name: 'test',
        target: 'web',
        mode: 'development',
        entry,
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
                    options: {presets: [
                        '@babel/preset-env', '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-syntax-jsx'
                    ]
                    }}, {loader: 'ts-loader', options: {
                        compilerOptions: {
                            "target": "es5",
                            "module": "commonjs",
                            "jsx": "react",
                            "esModuleInterop": true,
                            "skipLibCheck": true,
                            "noEmit": false
                          }
                    }}],
            },
            {
                test: /\.tsx$/,
                resolve: { fullySpecified: false },
                use: [{ loader: 'babel-loader',
                options: {presets: [
                    '@babel/preset-env', '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-syntax-jsx'
                ]
                }}, {loader: 'ts-loader', options: {
                    compilerOptions: {
                        "target": "es5",
                        "module": "commonjs",
                        "jsx": "react",
                        "esModuleInterop": true,
                        "skipLibCheck": true,
                        "noEmit": false
                      }
                }}],
                
            },
            {
                test: /\.js$/,
                resolve: { fullySpecified: false },
                loader: 'babel-loader',
                options: {
                presets: [
                    '@babel/preset-env', ['@babel/preset-react', {  "runtime": "automatic" }]
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
                    '@babel/preset-env', ['@babel/preset-react', {  "runtime": "automatic" }]
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
        })
        
        const server = new WebpackDevServer(compiler as any, {
        stats: {
            colors: true
        }
        });
        
        const port = portToListenOn || (3000 + Math.floor(Math.random() * Math.floor(1000)));

        const browser = await puppeteer.launch({headless: Boolean(browserIsHeadless)});
        const page = await browser.newPage();

        async function serverSetup() {
            // server.listen(port, "localhost", serverListeningCallback || (() => {}));
            await new Promise((res, rej) => {
                server.listen(port, "localhost", serverListeningCallback || (async () => {
                    await page.goto(`http://localhost:${port}`);
                    res(true);
                }));
              })
        }

        return {serverSetup, port, server, browser, page}
}