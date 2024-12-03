const mongoose =require('mongoose');
// mongoose.set("strictQuery",true);
async function connnectToMongoDB(url) {
    return mongoose.connect(url);
}
module.exports={
    connnectToMongoDB,
}