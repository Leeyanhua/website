const index = require('../routes/index');
const users = require('../routes/users');
const policy = require('../routes/policy');
const incubator = require('../routes/incubator');
const registry = require('../routes/registry');
const contract = require('../routes/contract');
const apply_policy = require('../routes/apply_policy');
const apply_space = require('../routes/apply_space');
const settings = require('../routes/settings');
const chat_record = require('../routes/chat_record');

module.exports = (app) => {
  console.log('init URL');

  app.use('/api/settings', settings);
  app.use('/api/users', users);
  app.use('/api/policy', policy);
  app.use('/api/incubator', incubator);
  app.use('/api/registry', registry);
  app.use('/api/contract', contract);
  app.use('/api/apply_policy', apply_policy);
  app.use('/api/apply_space', apply_space);
  app.use('/api/chat-record', chat_record);
  app.use('/', index);

  console.log('init URL end');
}
