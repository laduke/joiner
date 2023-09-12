import * as td from 'testdouble'
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'

test('the app', async (t) => {
  let subject, loadsResources, diffsResources, updatesResources, loadsAuthToken

  beforeEach(async () => {
    loadsResources = await td.replaceEsm('../src/loads-resources.js')
    diffsResources = await td.replaceEsm('../src/diffs-resources.js')
    updatesResources = await td.replaceEsm('../src/updates-resources.js')
    loadsAuthToken = await td.replaceEsm('../src/loads-authtoken.js')

    subject = (await import('../src/index.js')).default()
  })

  afterEach(() => {
    td.reset()
  })

  await t.test('run', async () => {
    const config = { urls: [1], tokenPath: '', localPort: 1 }

    td.when(loadsAuthToken.load('')).thenResolve('abc')
    td.when(
      loadsResources.load({ urls: [1], authToken: 'abc', localPort: 1, files: [] })
    ).thenResolve({
      local: [],
      remote: []
    })
    td.when(diffsResources.diff([], [])).thenReturn({ added: [], removed: [] })
    td.when(
      updatesResources.update(td.matchers.anything(), {
        added: [],
        removed: []
      })
    ).thenResolve({
      joined: [],
      left: []
    })

    const results = await subject.run(config)

    assert.deepEqual(results.joined, [])
    assert.deepEqual(results.left, [])
  })

  // await t.test('bad url config', async () => {
  //   const config = { authToken: 'a' }

  //   await assert.rejects(() => subject.run(config), /Error: No remote urls/)
  // })

  // await t.test('bad authtoken config', async () => {
  //   const config = { urls: [1] }
  //   await assert.rejects(() => subject.run(config), /Error: No authtoken/)
  // })
})

// await t.test("local networks error", async () => {
//   td.when(loadsLocalNetworks.load("")).thenReject(
//     new Error("Service Problem"),
//   );

//   await assert.rejects(subject.run, { message: "Service Problem" });
// });

// await t.test("remote networks error", async () => {
//   td.when(loadsRemoteNetworks.load([])).thenReject(
//     new Error("Remote Problem"),
//   );

//   await assert.rejects(subject.run, { message: "Remote Problem" });
// });

// await t.test("local networks validation error", async () => {
//   td.when(loadsLocalNetworks.load("")).thenResolve("asdf");
//   td.when(validatesLocalNetworks.validate("asdf")).thenThrow(
//     new Error("Local Validation Error"),
//   );

//   await assert.rejects(subject.run, { message: "Local Validation Error" });
// });

// await t.test("remote networks validation error", async () => {
//   td.when(loadsRemoteNetworks.load([])).thenResolve("jorts");
//   td.when(validatesRemoteNetworks.validate("jorts")).thenThrow(
//     new Error("Remote Validation Error"),
//   );

//   await assert.rejects(subject.run, { message: "Remote Validation Error" });
// });

// await t.test("join networks error", async () => {
//   td.when(updatesLocalNetworks.join(1)).thenReject(new Error("join"));
//   await assert.rejects(subject.update([1], []), { message: "join" });
// });

// await t.test("leave networks error", async () => {
//   td.when(updatesLocalNetworks.leave(2)).thenReject(new Error("leave"));
//   await assert.rejects(subject.update([], [2]), { message: "leave" });
// });

// await t.test("leave networks error 2", async () => {
//   td.when(loadsLocalNetworks.load("")).thenResolve([1, 2, 9]);
//   td.when(loadsRemoteNetworks.load([])).thenResolve([2, 3]);
//   td.when(diffsNetworks.diff([1, 2, 9], [2, 3])).thenReturn({
//     leave: [1, 9],
//     join: [3],
//   });
//   td.when(updatesLocalNetworks.leave(1)).thenReject(new Error("leave"));

//   await assert.rejects(subject.run(), { message: "leave" });
// });

// await t.test("join networks error 2", async () => {
//   td.when(loadsLocalNetworks.load("")).thenResolve([1, 2, 9]);
//   td.when(loadsRemoteNetworks.load([])).thenResolve([2, 3]);
//   td.when(diffsNetworks.diff([1, 2, 9], [2, 3])).thenReturn({
//     leave: [1, 9],
//     join: [3],
//   });
//   td.when(updatesLocalNetworks.leave(1)).thenReject(new Error("join"));

//   await assert.rejects(subject.run(), { message: "join" });
// });
