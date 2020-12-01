import puppeteer from 'puppeteer';

import * as path from 'path';
import * as fs from 'fs';

import * as net from 'net';

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const checkIfPortInUse = async (port: number): Promise<boolean> => {
	return new Promise((res, rej) => {
		const testServer = net.createServer().listen(port);
		testServer.on('error', (e: any) => {
			if (e.code != 'EADDRINUSE') {
				rej(e)
			} else {
				res(true);
			}
		})
		
		testServer.on('listening', () => {
			testServer.close();
		});

		testServer.on('connection', () => {
			testServer.close();
		});

		testServer.on('close', () => {
			res(false);
		})
	});
};

interface ServerAndPupeteerObject {
	port: number;
	server: WebpackDevServer | null;
	browser: puppeteer.Browser | null;
	page: puppeteer.Page | null;
}

export async function CreateServerAndClient(
	portToListenOn = undefined,
	browserIsHeadless = true,
	entry = undefined,
	modules = [ path.join(__dirname, '../../../node_modules') ],
	fullySpecifiedImports = false,
	usingTypescript = false,
): Promise<ServerAndPupeteerObject> {
	const getRandomPortNumber = (): number => {
		return 3000 + Math.floor(Math.random() * Math.floor(1000));
	}

	let port = portToListenOn || getRandomPortNumber();
	let isPortInUse = await checkIfPortInUse(port);
	while(isPortInUse) {
		port = getRandomPortNumber();
		isPortInUse = await checkIfPortInUse(port);
	}

	if (modules.some((m) => !fs.existsSync(m))) {
		throw new Error(
			`The modules property contains a path which does not exist. This may happen if for exammple this package is npm linked and the modules array is not updated.`
		);
	} else if (!entry) {
		throw new Error(
			`Please provide a file to be used as the entry point for the test. This may be a file containing a call to ReactDom.render.`
		);
	} else {
		const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
			template: path.join(__dirname, '../client/index.html'),
			filename: 'index.html',
			inject: 'body'
		});

		const typescriptModuleRules = [
			{
				test: /\.ts$/,
				resolve: { fullySpecified: fullySpecifiedImports },
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [ '@babel/plugin-syntax-jsx' ]
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
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [ '@babel/plugin-syntax-jsx' ]
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
				rules: [
					...(usingTypescript ? typescriptModuleRules : []),
					{
						test: /\.js$/,
						resolve: { fullySpecified: fullySpecifiedImports },
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', [ '@babel/preset-react', { runtime: 'automatic' } ] ],
							plugins: [ '@babel/plugin-syntax-jsx' ]
						}
					},
					{
						test: /\.jsx$/,
						resolve: { fullySpecified: fullySpecifiedImports },
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', [ '@babel/preset-react', { runtime: 'automatic' } ] ],
							plugins: [ '@babel/plugin-syntax-jsx' ]
						}
					},
					{
						test: /\.css$/,
						use: [ 'css-loader' ]
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
				]
			},
			resolve: {
				modules
			},
			plugins: [ HtmlWebpackPluginConfig ]
		});

		let server = null;
		await new Promise((res, rej) => {
			server = new WebpackDevServer(compiler as any, {
				onListening: (server) => {
					res(null);
				},
				stats: {
					colors: true
				}
			});

			server.listen(port, 'localhost', (error) => {
				if (error) {
					console.error(`Error occurred with WebPack server listening on port ${port}.`);
					throw error;
				}
			});
		});

		let page = null;
		let browser = await puppeteer.launch({ headless: Boolean(browserIsHeadless) });

		if (browser) {
			page = await browser.newPage();
			try {
				await page.goto(`http://localhost:${port}`);
			} catch (e) {
				console.error(`Unable to use Puppetter page to goto URL for WebPackServer.`);
				throw e;
			}
		}

		return { port, server, browser, page };
	}
}
