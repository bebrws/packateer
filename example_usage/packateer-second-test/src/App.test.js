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
