//verificar se user está logado
function adminAuth(req, res, next){
    //next dá continuidade a req. ; ele passa a req. do middleware p/ rota
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = adminAuth;