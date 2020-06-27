const Hero = require("../models/Hero");
const Utils = require("../utils/index");

module.exports = {
  async store(req, res) {
    const hero = await Hero.create({
      name: req.body.name,
      class: req.body.class,
      classPriority: Utils.priorityHero(req.body.class),
    });
    return res.json(hero);
  },

  async update(req, res) {
    const hero = await Hero.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        class: req.body.class,
        classPriority: Utils.priorityHero(req.body.class),
      }
    );
    return res.json(hero);
  },

  async index(req, res) {
    const heros = await Hero.find({});
    return res.json(heros);
  },

  async find(req, res) {
    const hero = await Hero.findOne({
      _id: req.body._id,
    });
    return res.json(hero);
  },

  async delete(req, res) {
    const response = await Hero.deleteOne({
      _id: req.body._id,
    });
    return res.json(response);
  },

  async battles(req, res) {
    const battles_arr = await Hero.find({});
    var battles = [];
    battles_arr.forEach((hero) => {
      hero.battle.forEach((battle) => {
        battles.push({
          _id: battle._id,
          heroName: hero.name,
          heroClass: hero.class,
          monsterName: battle.monsterName,
          active: battle.active,
          dangerLevel: battle.dangerLevel,
          location: battle.location,
          createdAt: battle.createdAt,
        });
      });
    });
    //console.log(battles);
    return res.json(battles.sort((a, b) => b.createdAt - a.createdAt));
  },

  async finishBattle(req, res) {
    const hero = await Hero.updateOne(
      { "battle._id": req.body._id },
      {
        $set: { "battle.$.active": false },
      }
    );
    return res.json(hero);
  },

  async allocate(ocurrence) {
    var hero = "Nenhum";
    if (Utils.priorityMonster(ocurrence.dangerLevel) != 0) {
      hero = await Hero.findOne({
        classPriority: Utils.priorityMonster(ocurrence.dangerLevel),
        $or: [{ "battle.active": false }, { battle: [] }],
      });
    } else {
      hero = await Hero.findOne({
        $or: [{ "battle.active": { $ne: true } }, { battle: [] }],
      });
    }

    if (hero != null) {
      battles = [
        ...hero.battle,
        {
          dangerLevel: ocurrence.dangerLevel,
          monsterName: ocurrence.monsterName,
          createdAt: Date.now(),
          active: true,
          location: {
            lat: ocurrence.location[0].lat,
            lng: ocurrence.location[0].lng,
          },
        },
      ];
      await Hero.updateOne(
        { _id: hero._id },
        {
          battle: battles,
        }
      );
    }
  },
};
