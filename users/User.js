//Model - interação com o database
const Sequelize = require('sequelize');
const connection = require('../database/database'); 

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//User.sync({ force: false }); 
//force false = não  recria

module.exports = User;