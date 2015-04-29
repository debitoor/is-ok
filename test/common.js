var chai = require('chai');
var sinon = require('sinon');

chai.use(require('chai-subset'));
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.spy = sinon.spy;
