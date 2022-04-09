//Model - interação com o database
const Sequelize = require('sequelize');
const connection = require('../database/database'); 
const Category = require('../categories/Category') 

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Tem muitos = relacionamento 1 - n
//pertence a 
Category.hasMany(Article);
Article.belongsTo(Category);

//comentada p/ não recriar de novo
//Article.sync({ force: true });

module.exports = Article;