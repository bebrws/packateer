# What is this?

This is a library which will take a filename (the entry argument), use webpack to compile that JSX file into a website.
Then use the WebpackDevServer to host it. It follows this up by creating a puppeteer browser and loading a page to the
site this library just hosted.

You are then provided the pupeteer and webpack dev server variables to test to your hearts content.

This is useful when you need to test interaction with React components that cannot be tested with available
virtual DOM options. One such example is shown below, testing tabIndex.

# Example Usage

### App.spec.js

```
import TestReactJS from 'packateer';

import * as path from 'path';

jest.setTimeout(500000)

async function delay(delayTime) {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, delayTime)
  });
}

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


let [ppage, pserver] = [undefined, undefined];

describe('test with pup', () => {
  beforeAll(async () => {

    const {serverSetup, port, server, browser, page} = await TestReactJS({browserIsHeadless: false, entry: path.join(__dirname, '/puptest.subpage.jsx')});
    ppage = page;
    pserver = server;

    await serverSetup();
  })

  afterAll(() => {
    pserver.close();
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

})
```

### puptest.subpage.jsx

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <>
        <App />
    </>
  ,
  document.getElementById('root')
);

```