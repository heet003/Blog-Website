const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const homeStartingContent = "Welcome to MY BLOGs. Discover a world of knowledge, inspiration, and creativity right at your fingertips. Our blog is your go-to destination for captivating stories, insightful articles, and valuable resources on a wide range of topics. Whether you're a passionate reader, a curious learner, or a seeker of fresh perspectives, we have something special in store for you. Dive into our thought-provoking articles crafted by a team of expert writers and industry professionals. Explore diverse subjects such as technology, science, art, culture, lifestyle, and so much more. We strive to deliver content that not only informs but also engages and entertains, sparking meaningful conversations and broadening horizons.";
const aboutContent = "Welcome to MY BLOGs. At MY BLOGs, we are passionate about providing valuable and engaging content to our readers. Our goal is to create a platform that caters to a wide range of interests and offers a diverse array of topics, ensuring there's something for everyone. We believe that knowledge is power, and that's why we strive to deliver well-researched, informative, and thought-provoking articles. Whether you're seeking practical advice, inspiration, or entertainment, we've got you covered.";
const contactContent = "We're thrilled that you want to get in touch with us! At MY BLOGs, we value your feedback, questions, and suggestions. We believe in fostering a strong connection with our readers and community. Your input is incredibly important to us as we strive to create content that meets your needs and interests.\nIf you have any inquiries, comments, or simply want to say hello, we'd love to hear from you. Feel free to reach out to us using the contact information provided below. Our dedicated team is here to assist you and ensure that your experience with MY BLOGs is exceptional.\nEmail: abc@gmail.com\nPhone: 99*******03\nSocial Media: www.instagram.com .";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", { homeText: homeStartingContent, array: posts });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutText: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactText: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/posts/:topic", function (req, res) {
  let s = req.params.topic
  let search = _.lowerCase(s);
  posts.forEach(function (object) {
    if (_.lowerCase(object.title) === search) {
      res.render("post", { searchedPost: object });
    }
  });
});
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.title,
    content: req.body.textarea
  }
  posts.push(post);
  res.redirect("/");
  res.send();
});









app.listen(3000, function () { });
