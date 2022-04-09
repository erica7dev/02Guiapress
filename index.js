const express = require("express");
const app = express();
const connection = require("./database/database");
const session = require('express-session');


//body-parser
app.use(express.urlencoded({ extended: 
    false }));
    app.use(express.json());

//router
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/articlesController');
const usersController = require('./users/usersController');

//passando var do router
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);

//models
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//view engine
app.set("view engine", "ejs");

//sessions
app.use(session({
  secret:"segredo",  //secret é senha da sessão, tipo salt no bcrypt
  cookie: {maxAge: 30000}, //tempo em que expira cookie (segundos)
  resave: true,
  saveUninitialized: true //Os valores padrão de resave e saveUninitialized são true, podendo ser modificados conforme necessidade
}));


app.get("/", (req, res) => {//ordem dos itens na home
  Article.findAll({
      order: [
          ['id', 'DESC']
      ],
      limit: 4
  }).then(articles => {

      Category.findAll().then(categories => {
          res.render("index", {
              articles: articles,
              categories: categories
          });
      });

  });
});



//slug
app.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {
        slug: slug
    }
  }).then(article =>{
    if(article != undefined){
      Category.findAll().then(categories => {//filtrando artigos por cat.
          res.render("article", {
              article: article,
              categories: categories
          });
      });

  }else{
      res.redirect("/");
  }
  }).catch(err =>{
    console.log(err);
    res.redirect("/");
  })
})

//database
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao DB!");
  })
  .catch((err) => console.log(err));

//arquivos estáticos
app.use(express.static("public"));

app.listen(8080, () => {
  console.log("Tá rodando");
});

