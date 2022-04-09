//rotas
const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs')//hash

router.get('/admin/users',(req,res)=>{
    User.findAll().then(users => {
        res.render("admin/users/index", {
            users: users//envia os dados da lista de users
        });
    });
})

router.get('/admin/users/create',(req,res)=>{
    res.render("admin/users/create");
})

//login
router.post("/users/create", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({//pego campos do form e verifico, impedindo emails duplicados
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined){
            // slat = letras e num aleatórios add a hash p/ que ela fique mais complexa
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });
        }else{
            res.redirect("/admin/users/create");
        }
    })
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});


router.post("/authenticate", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({//pesquisar se existe email no database
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined){//se existe usuário com esse email...
            // validar senha com bcrypt - transforma em hash e compara com a hash do database
            const correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = { //todo mundo que tiver essa sessão tá logado
                    id: user.id,
                    email: user.email
                }

                res.redirect('/admin/articles');

            }else{
                res.redirect('/login')
            }

        }else{
            res.redirect('/login');
        }
    });
});


router.get("/logout",(req,res)=>{
    res.session.user = undefined;
    res.redirect("/");
})

module.exports=router;