//console.log("Hello World");

const express=require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const http=require("http");
//const bodyParser = require("body-parser");

const path=require("path");

const app=express();

//app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.urlencoded({extended:true}));
app.use(express.json());


//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

const port=3000;

app.listen(3000,()=>{
    console.log("Server is running on ",port);
});

console.log(path);
app.get('/',(req,res)=>{
   // console.log(req);
   
    res.sendFile(path.join(__dirname,"/index.html"),(err)=>{
        if(err){
           return console.log(err);
        }else{
            console.log("File sent sucessfully : ");
        }
    });
})

app.post("/basic",(req,res)=>{
   // console.log(req.fname);
   //console.log(req.body.city);
var weatherData;
  const appid="c8988295f6758804ed36f7eb8fd2331a";
 const loc=req.body.city;
   const url="http://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+appid+"&units=metric";
   http.get(url,(response,error)=>{
       if(error){
           return console.log(error);
       }
      // console.log(response.statusCode);
       response.on("data",(data)=>{
           weatherData=JSON.parse(data);
          console.log(weatherData);
          const a=weatherData.weather[0].main;
          const temp=weatherData.main.temp;
          const txt="<h1> Weather condition " +a+ "</h1> <br> <h2> Temperature  "+temp+"</h2>";
          res.send(txt);

       })

  });
 // res.send("Data Fetch Sucessfully : ");


   
});

// res.send(JSON.stringify(weatherData));
//"clear sky"weather[0].description