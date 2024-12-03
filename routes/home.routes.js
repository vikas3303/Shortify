const express = require("express");
const router = express.Router();

const { handleToGetOriginalURL } = require("../controllers/url.controler");
const URL = require("../models/url.models");
const { restrictTo } = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  if (!req.user) return res.render("home");
  
  const error = req.query.error;
  const success = req.query.success;
  const URLs = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: URLs,
    user: req.user,
    error,
    ShortURL: success,
    reqInfo: `${req.protocol}://${req.headers.host}`,
  });
});

router.get("/a/signup", (req, res) => {
    return res.render("signup");
});
  
router.get("/a/login", (req, res) => {
    return res.render("login");
});

router.get("/a/logout", (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.redirect("/a/login");
});


router.get("/a/admin", restrictTo(["ADMIN"]) ,async (req, res) => {
  const allURLs = await URL.find({});
  res.render("home", {
    urls: allURLs,
    user: req.user,
    reqInfo: `${req.protocol}://${req.headers.host}`,
  });
});


router.get("/:shortId", handleToGetOriginalURL);

module.exports = router;

