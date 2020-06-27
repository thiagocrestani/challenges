module.exports = {
  priorityHero(className) {
    switch (className) {
      case "S":
        return 1;
      case "A":
        return 2;
      case "B":
        return 3;
      case "C":
        return 4;
    }
  },
  priorityMonster(className) {
    switch (className) {
      case "Gold":
        return 1;
      case "Silver":
        return 2;
      case "Copper":
        return 3;
      case "Wood":
        return 4;
      default:
        return 0;
    }
  },
};
