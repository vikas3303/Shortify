const express = require("express");
const router =express.Router();
const { 
    handleGenerateNewShortURL,
    handleGetAnalytics
} =require("../controllers/url.controler");


router.post("/",handleGenerateNewShortURL);


router.get("/analytics/:shortId",handleGetAnalytics);

module.exports=router;





