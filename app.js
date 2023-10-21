const express =require("express");
const app =express();
const bodyParser = require("body-parser");
const https = require("node:https");


app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req ,res){
   res.sendFile(__dirname +"/index.html");

})
app.use(express.static("Public"));
app.post("/",function(req,res){
    // console.log(req.body.cityname);
    const query =req.body.cityname;
    const apiKey="5d7d51100a81ff5078e1d83a0fc024c0";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5d7d51100a81ff5078e1d83a0fc024c0&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const wedata =JSON.parse(data);
            console.log(wedata);
            const temp = wedata.main.temp;
            console.log(temp);
            const wedep =wedata.weather[0].description;
            const icon =wedata.weather[0].icon;
            const imgurl = " https://openweathermap.org/img/wn/"+ icon +"@2x.png"


            console.log(wedep);
            // res.write();
            // res.write();
            // res.write();
            res.send("<h3>The wether is </h3>"+wedep +"<br><h1>The "+query +" have temp</h1>"+   temp +"<img src="+imgurl+ ">");
        })
    })
    console.log("post receive");

})




app.listen(process.env.PORT || 3000,function(){
    console.log("port 3000 is listening");
})
