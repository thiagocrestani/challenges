const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const heroController = require("./controllers/HeroController");
const userController = require("./controllers/UserController");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const socket = require('socket.io-client')('https://zrp-challenge-socket.herokuapp.com:443');
const authMiddleware = require("./middlewares/auth");


mongoose.connect(
  "mongodb+srv://admin:tvajP44zcSGQn2Ks@cluster0-jvxo8.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

router.post("/authenticateUser", userController.authenticate);

router.use(authMiddleware);

router.post("/createNewHero", heroController.store);

router.get("/getAllHeroes", heroController.index);

router.get("/getAllBattles", heroController.battles);

router.post("/deleteHero", heroController.delete);

router.post("/getHero", heroController.find);

router.post("/updateHero", heroController.update);

router.post("/finishBattle", heroController.finishBattle);

socket.on('occurrence', function(occurrence){
    heroController.allocate(occurrence);
});

app.listen(8000, function () {
  console.log("Running NodeJS");
});