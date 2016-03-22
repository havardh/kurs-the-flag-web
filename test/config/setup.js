import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.should();

const sandbox = sinon.sandbox.create();
afterEach(() => sandbox.restore());

global.expect = chai.expect;
global.sinon = sandbox;
