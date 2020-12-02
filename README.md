# Packateer
![Packateer](https://raw.githubusercontent.com/bebrws/packateer/master/packateerLogo.svg "Packateer Logo")

# What is this?

It provides a function that requires a file (usually a JSX or TSX file) as input for a WebpackDevServer instance to host after transpiling and compilation. Puppeteer is used to manage the browser which is directed to the url of this Webpack server. The Puppeteer and WebpackDevServer instances created in this process are returned along with the port used by this server.

One use case would be the need or preference to test against a browser as an alternative to other options.

# Possible Use Cases
## Testing Tab Ordering

An example is provided in the example_usage folder and [listed below](#example-usage)

You can take one or more components ( [App.js](#appjs) contains one for this example )

Then organize these components in the [entry point](#appsubpagejsx) file which which is given to the WebpackDevServer in the [test](#apptestjs).

In the example the tab ordering is tested.

![Browser tabbing through DIV elements](https://github.com/bebrws/packateer/raw/master/packateer.gif)
### App.test.js

```
import { CreateServerAndClient } from 'packateer';
import * as path from 'path';
import * as util from 'util';

jest.setTimeout(50000); 


function findFocusedNodes(node) {
  if (node.focused) {
    return [node]
  } else if (node.children && node.children.length) {
    // Array.prototype.flatMap = function(mapFunction) { return this.map(mapFunction).reduce((a, c) => { return [ ...a, ...(Array.isArray(c) ? c : [c]) ]; }, []) }
    return node.children.map(n => findFocusedNodes(n)).reduce((a, c) => { return [ ...a, ...(Array.isArray(c) ? c : [c]) ]; }, []);
  } else {
    return [];
  }
}

async function delay(delayTime) {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, delayTime)
  });
}

let [ppage, pserver, pbrowser] = [undefined, undefined, undefined];

describe('test with pup', () => {
  beforeAll(async () => {
    const { port, server, browser, page } = await CreateServerAndClient(undefined, false, path.join(__dirname, 'App.subpage.jsx'), [path.join(__dirname, '../node_modules')]);
    pserver = server;
    ppage = page;
    pbrowser = browser;
    
  })
  
  afterAll(() => {
    pbrowser && pbrowser.close();
    pserver && pserver.close();
  })

  test('renders learn react link', async () => {
    await ppage.waitForSelector('#initial');

    await ppage.focus("#initial");
    await delay(500);
    let snapNode = await ppage.accessibility.snapshot();
    let inFocus = findFocusedNodes(snapNode);
    expect(inFocus.length).toEqual(1);
    expect(inFocus[0].name).toEqual("initial");

    ppage.keyboard.press('Tab');
    await delay(500);
    snapNode = await ppage.accessibility.snapshot();
    inFocus = findFocusedNodes(snapNode);
    expect(inFocus.length).toEqual(1);
    expect(inFocus[0].name).toEqual("First");

    ppage.keyboard.press('Tab');
    await delay(500);
    snapNode = await ppage.accessibility.snapshot();
    inFocus = findFocusedNodes(snapNode);
    expect(inFocus.length).toEqual(1);
    expect(inFocus[0].name).toEqual("Second");
  });

});
```

### App.subpage.jsx

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);
```


### App.js

```
// import React from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <div id="initial" tabIndex="0">initial</div>
    <div id="First" tabIndex="0">First</div>
    <div id="Second" tabIndex="0">Second</div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey, this is a test.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
```