import Users from "../../dao/Users.dao";
import mongoose from "mongoose";
import { describe, it } from "mocha";
import Assert from "assert";

const assert = Assert.strict;

(async () => {
  await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority');

  describe("Test dao Users", function() {
    this.timeout(10_000);

    it("should create a user", async () => {
      // la lógica de prueba aquí
    });
  });
})();
