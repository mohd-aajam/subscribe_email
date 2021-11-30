const request = require("request")
// const bodyparser = require("body-parser")
// app.use(bodyparser.urlencoded({ extended: true }));
const express = require("express")
const app = express();

app.use(express.static("public"));

app.use(express.json());app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;

    var data={members:[
        {email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]}
    
    var jsonData=JSON.stringify(data);
    
    var option={
        url: "https://us20.api.mailchimp.com/3.0/lists/4d2893d6d0",
        method: "POST",
        headers:{
            "Authorization": "Aajam 97b24df21e74aa8a99ef299fa7f6aef6-us20"
        },
     body:jsonData 
    };
    
    request(option, function(error, response, body){
        if (error){
            // console.log(error);
            res.sendFile(__dirname+"/failure.html")
        }
        else {
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html")
            }
            res.sendFile(__dirname+"/failure.html")

        }
    });
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
// process.env.PORT means it is a dynamic port my server provider can change the port at any given of time.|| or listen to 3000(local system)
app.listen(process.env.PORT || 3000,function(){
// console.log("listening on port 3000")
});
