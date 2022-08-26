var test = require('tape');

test('timing test', function (t) {
    t.plan(2);

    t.equal(typeof Date.now, 'function');
    var start = Date.now();

    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});

test('test using promises', async function (t) {
    const result = await someAsyncThing();
    t.ok(result);
});