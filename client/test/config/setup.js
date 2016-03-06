import chai from "chai"
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
chai.should();

global.expect = chai.expect;
global.sinon = sinon;
