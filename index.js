var express = require("express")
var cheerio = require("cheerio");
const { get } = require("mongoose");
var cors = require("cors")

var app = express()

app.use(cors());
 

async function getPrice(scripName){
    var url = `https://www.google.com/finance/quote/${scripName}:nse`

    var response = await fetch(url);
    var data = await response.text();
    var $ = cheerio.load(data);
    var price = $(".YMlKec.fxKbKc").html()
    price = price.replace(price[0], "")
    price = price.replace(/,/g, "")
    price = parseFloat(price)
    return price;
}

app.get("/price/:scripName",async (req,res)=>{
    // var price = await getPrice(['sbicard','sbin','rblbank']);
    var price = await getPrice(req.params.scripName);
    // console.log(price);
    // res.send("Done")
    var date = new Date()
    console.log(date.getHours().toString() +':'+ date.getMinutes().toString() +':'+ date.getSeconds().toString());
    res.json({name: req.params.scripName.toUpperCase(),
    price : price})
    
})
app.get("/",(req,res)=>{
    res.send("Welcome to this API")
})

app.listen(process.env.PORT,()=>{
    console.log(`server started at $(process.env.PORT) `)
})



