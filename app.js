//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
const mongoose = require("mongoose");
const { title } = require("process");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shubhayan:blog123@cluster0.gfq4a.mongodb.net/blog",{useNewUrlParser: true});

const itemSchema = {
  title: String,
  body: String,
  
};
const contents=[];

const Item = mongoose.model("Item", itemSchema);

app.get("/",function(req,res){
  Item.find({}, function(err,result){
    if(err)
    console.log(err);
    else{
      res.render("home.ejs", {contents: result});
    }
  })
  
});

app.get("/about", function(req,res){
  res.render("about.ejs", {aboutContent: aboutContent})
})


app.get("/contact", function(req,res){
  res.render("contact.ejs", {contactContent: contactContent})
})

app.post("/", function(req,res){
  let content={
    title: req.body.postTitle,
    body: req.body.postBody,
  };

  const newItem = new Item(
    {
      title: content.title,
     body: content.body
    });

   

    Item.find({}, function(err,result){
      if(!err)
      {
        console.log("successful !!");
        newItem.save();
        res.redirect("/");
      }
      else
      console.log(err);
    });

  
})

var bodyContent="";
var titleContent="";

app.get("/post/:postName", function(req,res){
  const requestedTitle = req.params.postName;
  console.log(_.lowerCase(requestedTitle));
  Item.findOne({title: requestedTitle}, function(err, result){
    if(err)
      console.log(err);
      else{
        res.render("post.ejs", {body: result.body, title: result.title});

      }
  });
  
});



app.get("/compose", function(req,res){
  res.render("compose.ejs")
})







app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
