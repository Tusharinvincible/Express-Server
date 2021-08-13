const express=require("express");
const app=express();

var multer = require('multer');

var upload = multer();

const http=require("http");



const path=require("path");


app.set("view engine", "ejs");

app.use(express.static("public"))
//app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.urlencoded({extended:true}));
app.use(express.json());


//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

const port=3000;
let temp=0;
let isShow=false;
let loc="";


console.log(path);
app.get("/",(req,res)=>{
    res.render("index",{check:isShow,nameOfCity:loc,temperature:temp});
})

app.post("/basic",(req,res)=>{
   // console.log(req.fname);
   //console.log(req.body.city);
var weatherData;
  const appid="c8988295f6758804ed36f7eb8fd2331a";
  loc=req.body.cityName;
   const url="http://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+appid+"&units=metric";
   http.get(url,(response,error)=>{
       if(error){
           return console.log(error);
       }
      // console.log(response.statusCode);
       response.on("data",(data)=>{
           weatherData=JSON.parse(data);
          console.log(weatherData);
        //   const a=weatherData.weather[0].main;
        temp=weatherData.main.temp;

        isShow=true;
        //   const txt="<h1> Weather condition " +a+ "</h1> <br> <h2> Temperature  "+temp+"</h2>";
          
          res.redirect("/");

       })

  });
 // res.send("Data Fetch Sucessfully : ");


   
});

// res.send(JSON.stringify(weatherData));
//"clear sky"weather[0].description


app.listen(3000,()=>{
    console.log("Server is running on ",port);
});
