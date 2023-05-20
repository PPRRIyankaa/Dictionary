const mongoose = require('mongoose')

const wordDetail = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    count:{
        type:Number,
        required:true
    },
},
{ timestamps: true }
)

const searchedwords = new mongoose.model("Words",wordDetail);
module.exports = searchedwords;