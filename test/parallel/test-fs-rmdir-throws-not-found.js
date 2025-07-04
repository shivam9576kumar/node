'use strict';
const common = require('../common');
const tmpdir = require('../common/tmpdir');
const assert = require('assert');
const fs = require('fs');

tmpdir.refresh();

{
  assert.throws(
    () =>
      fs.rmdirSync(tmpdir.resolve('noexist.txt')),
    {
      code: 'ENOENT',
    }
  );
}
{
  fs.rmdir(
    tmpdir.resolve('noexist.txt'),
    common.mustCall((err) => {
      assert.strictEqual(err.code, 'ENOENT');
    })
  );
}
{
  assert.rejects(
    () => fs.promises.rmdir(tmpdir.resolve('noexist.txt')),
    {
      code: 'ENOENT',
    }
  ).then(common.mustCall());
}
