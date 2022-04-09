//Model - interação com o database
const Sequelize = require('sequelize');
const connection = require('../database/database'); 

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//cria a tabela sempre que exec. programa
//excluir p/ não recriar
//Category.sync({ force: true }); 

module.exports = Category;