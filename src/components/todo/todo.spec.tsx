import { assert } from "chai";

describe("<my-todo>", () => {
  describe("Can render <todo-item>", () => {
    let myElementInstance;

    beforeEach(done => {
      const myElement = document.createElement("todo-item");
      myElementInstance = document.body.appendChild(myElement);
      done();
    });

    afterEach(done => {
      myElementInstance.remove();
      done();
    });

    it("should return template", done => {
      setTimeout(() => {
        assert.isDefined(myElementInstance.shadowRoot.querySelector("input"));
        done();
      });
    });
  });
});
