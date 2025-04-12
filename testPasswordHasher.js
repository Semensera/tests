const assert = require('assert');
const sinon = require('sinon');
const prompt = require('prompt');
const bcrypt = require('bcrypt');
const { getPasswordAndHash } = require('./passwordHasher');

describe('Password Hasher', function () {
  it('повертає хеш при однакових паролях', async function () {
    const promptStub = sinon.stub(prompt, 'get');

    promptStub.onCall(0).resolves({ password: 'test123' });
    promptStub.onCall(1).resolves({ confirmPassword: 'test123' });

    const hash = await getPasswordAndHash();

    assert.ok(await bcrypt.compare('test123', hash));
    promptStub.restore();
  });

  it('виводить повідомлення при різних паролях', async function () {
    const promptStub = sinon.stub(prompt, 'get');
    const logSpy = sinon.spy(console, 'log');

    promptStub.onCall(0).resolves({ password: 'test123' });
    promptStub.onCall(1).resolves({ confirmPassword: 'wrong' });

    await getPasswordAndHash();

    assert.ok(logSpy.calledWith('Паролі не співпадають!'));

    promptStub.restore();
    logSpy.restore();
  });
});