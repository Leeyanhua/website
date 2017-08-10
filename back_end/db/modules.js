const mongoose = require('./db.js');
const Apply_policySchema = require('./modules/apply_policy');
const Apply_spaceSchema = require('./modules/apply_space');
const ContractSchema = require('./modules/contract');
const IncubatorSchema = require('./modules/incubator');
const PolicySchema = require('./modules/policy');
const RegistrySchema = require('./modules/registry');
const UserSchema = require('./modules/Users');
const ChatRecordSchema = require('./modules/chat_record');

module.exports = () => {
  mongoose.model('Apply_policy', Apply_policySchema);
  mongoose.model('Apply_space', Apply_spaceSchema);
  mongoose.model('Contract', ContractSchema);
  mongoose.model('Incubator', IncubatorSchema);
  mongoose.model('Policy', PolicySchema);
  mongoose.model('Registry', RegistrySchema);
  mongoose.model('User', UserSchema);
  mongoose.model('chat_record', ChatRecordSchema);
};
