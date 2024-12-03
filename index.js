// require("dotenv").config();
const express = require("express");
const path=require("path");
const cookieParser=require("cookie-parser");

const { connnectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url.routes");
const userRoute=require("./routes/user.routes");
const homeRoute=require("./routes/home.routes");
const {
    checkAuth,
    restrictTo,
}=require("./middleware/auth.middleware");



const URL=require("./models/url.models");

const app = express();
const PORT = 8003;
connnectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected")
);



app.set("view engine","ejs");
app.set('views',path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkAuth);


app.use("/url",restrictTo(["USER","ADMIN"]), urlRoute);
app.use("/user",userRoute);
app.use("/",homeRoute);

app.listen(PORT, () => console.log(`server at started at PORT :${PORT}`));
















// connectToMongo(process.env.MONGO_URL).then(() =>
//     console.log("mongoDB connected !!")
//   );