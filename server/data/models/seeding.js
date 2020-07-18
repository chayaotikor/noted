const faker = require("faker");
const User = require("./user");
const Note = require("./note");

/* SEED FUNCTION */
const seedingFunction = () => {
  for (let i = 0; i < 20; i++) {
    const seedNote = new Note({
      title: faker.random.word(),
      textBody: faker.hacker.phrase(),
      createdBy: "5f10ceaef64f4a5500f29b43",
    });

    let createdSeed;

    seedNote
      .save()
      .then((res) => {
        createdSeed = res._doc;
        return User.findById("5f10ceaef64f4a5500f29b43");
      })
      .then((user) => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.createdNotes.push(seedNote);
        return user.save();
      })
      .then((res) => {
        return createdSeed;
      })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = { seedingFunction };
