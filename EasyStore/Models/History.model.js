const mongoose = require("mongoose");


//History Schema
const historySchema = mongoose.Schema({
    body: {
        type:String,
        required:true
    },
    UserEmail: {
        type:String,
        required:true
    }
}, {
    versionKey: false
})

const HistoryModel = mongoose.model("history", historySchema);

module.exports = { HistoryModel };