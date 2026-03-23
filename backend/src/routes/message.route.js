const express =  require('express');

const router = express.Router()

router.get('/send',(req,res)=>{
    res.send("send Message")
})

module.exports = router;