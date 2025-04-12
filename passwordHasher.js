const prompt = require('prompt');
const bcrypt = require('bcrypt');

async function getPasswordAndHash() {
  prompt.start();

  const { password } = await prompt.get(['password']);
  const { confirmPassword } = await prompt.get(['confirmPassword']);

  if (password !== confirmPassword) {
    console.log('Паролі не співпадають!');
    return;
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Хеш пароля:', hash);

  return hash;
}

if (require.main === module) {
  getPasswordAndHash();
}

module.exports = { getPasswordAndHash };