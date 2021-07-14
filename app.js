const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("static"));
app.use(bodyparser.urlencoded({extended: true}));


app.get('/' , (req , res)=>{

   res.sendFile(__dirname + "/index.html");

});
app.post('/' , (req , res)=>{
const firstname = req.body.fname;
const lastname = req.body.sname;
const email = req.body.email;
   const data = {
       members: [
           {
            email_address: email,
            status : "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
           }
       ]
   };
 const jsondata = JSON.stringify(data);
 const url = "https://us6.api.mailchimp.com/3.0/lists/49ff0988ee"
 const options = {
     method: "POST" ,
     auth: "Harshchimp:e3740508623d8e785f71ad00d5bae8aa-us6"


 }
const request =  https.request(url, options, function(response){
    if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html"  );
        
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
})
 })
 request.write(jsondata);
 request.end();
});
app.post('/failure' , (req , res)=>{

  res.redirect("/");

});
app.post('/sucess' , (req , res)=>{

    res.redirect("/");
  
  });
app.listen(3000,function(){
    console.log("server running");
});




//api key        e3740508623d8e785f71ad00d5bae8aa-us6
//audience Id       49ff0988ee