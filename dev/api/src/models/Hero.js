const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    name: String,
    class: String,
    classPriority: Number,
    battle: [
      {
        dangerLevel: String,
        monsterName: String,
        active: Boolean,
        createdAt: Date,
        updatedAt: Date,
        location: {
          lat: Number,
          lng: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hero", HeroSchema);
