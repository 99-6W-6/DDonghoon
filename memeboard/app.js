
const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth-middleware");



mongoose.connect("mongodb://localhost/memeboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();
const usermembers = require('./routes/user');






router.get("/users/me", authMiddleware, async (req, res) => {
    const { user } =res.locals;
    res.send({
        user:{
            email:user.email,
           
        },
    });
})


app.use("/api", express.urlencoded({ extended: false }), router);
app.get(express.json());
app.use(express.static("assets"));

app.use("/api", [usermembers]);



app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});





