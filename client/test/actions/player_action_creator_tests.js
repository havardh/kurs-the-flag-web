import {setName, setColor} from "../../src/actions/player_action_creator";
import {SET_NAME, SET_COLOR} from "../../src/actions";

describe("PlayerActionCreator", () => {

  const id = 42;
  const name = "Rocket";
  const color = "Red"

  describe(".setName", () => {
    let fn;
    beforeEach(() => {
      fn = setName(id, name);
    });

    it("should return a callback", () => {
      expect(fn).to.be.an.instanceof(Function);
    });

    describe("returned callback", () => {
      let dispatch;
      beforeEach(() => {
        dispatch = sinon.spy();
      });

      it("call dispatch", () => {
        fn(dispatch);

        expect(dispatch).to.have.been.called;
      });

      it("should pass type SET_NAME to dispatch", () => {
        fn(dispatch);

        dispatch.should.have.been.calledWithMatch({
          type: SET_NAME
        });
      })

      it("should pass id and name to dispatch", () => {
        fn(dispatch);

        expect(dispatch).to.have.been.calledWithMatch({
          id, name
        });
      });
    });
  });

  describe(".setColor", () => {
    let fn;
    beforeEach(() => {
      fn = setColor(id, color);
    });

    it("should return a callback", () => {
      expect(fn).to.be.an.instanceof(Function);
    });

    describe("returned callback", () => {
      let dispatch;
      beforeEach(() => {
        dispatch = sinon.spy();
      });

      it("call dispatch", () => {
        fn(dispatch);

        expect(dispatch).to.have.been.called;
      });

      it("should pass type SET_NAME to dispatch", () => {
        fn(dispatch);

        dispatch.should.have.been.calledWithMatch({
          type: SET_COLOR
        });
      })

      it("should pass id and color to dispatch", () => {
        fn(dispatch);

        expect(dispatch).to.have.been.calledWithMatch({
          id, color
        });
      });
    });
  });
});
