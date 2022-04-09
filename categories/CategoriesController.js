//rotas
const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugiFy = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

//CREATE
router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/new');
});

router.post("/categories/save", adminAuth,(req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugiFy(title)//otimiza string - comp e inf = comp-e-inf
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }else{
        // redireciona o user
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories",adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

//DELETE
router.post("/categories/delete", adminAuth,(req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/categories");
            })
        }else{//SE não for número
            res.redirect("/admin/categories");
        }
    }else{//NULL
        res.redirect("/admin/categories");
    }
});

//EDIT
router.get("/admin/categories/edit/:id", adminAuth,(req, res) => {
    const id = req.params.id;
//SE ID NÃO É NÚMERO...
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }
    /*busca por id */
    Category.findByPk(id).then(category => {
        if(category != undefined){
            
            res.render("admin/categories/edit", {
                category: category
            });
            
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/categories");
    });
});

//UPDATE
router.post("/categories/update",adminAuth,(req,res)=>{
    const id = req.body.id;
    const title = req.body.title;

    Category.update({title: title, slug: slugiFy(title)},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories");
    });
});

module.exports=router;