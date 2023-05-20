const express = require('express');
require('./db/connect')
const Words = require('./model/models');
const port = 8000;
const path = require('path')
const cross = require('cors');

const app = express();
app.use(express.json());
app.use(cross());
app.get('/searchedwords',async(req,res)=>{
    res.send(await Words.find());
})
app.use('/', express.static(path.join(__dirname)))
app.post('/searchedwords',async(req,res)=>{
   const word = req.body.word;
   const count = 1;
   const data = await Words.find({word});
   console.log(data)
   if(data.length === 0){
   let w = new Words({
        word: word,
        count: 1
   })
    await w.save();
}
else{
    await Words.updateOne({word},{$set:{count:data[0].count+1}})
}
res.end();
})
app.listen(port,()=>{
    console.log(`Port ${port}`);
})