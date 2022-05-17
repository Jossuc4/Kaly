          
  const express=require('express')
  const exp = express()

  const url=require('url')

  exp.set('view engine','ejs') // so as to run the template motor ejs 

  exp.use(express.static('public'))// pour les fichiers de style


/**
 * Route processing
 */

exp.get('/',(req,res)=>{
    res.render("pages/accueil",{titre:"Accueil"})
})
exp.get('/Menu',(req,res)=>{
    const database=require('mysql')
    const db=database.createConnection({
        host:'localhost',
        user:'jossuca',
        password:'admin',
        database:'recettes'
    })
    db.connect((err)=>{
        if(err) throw error
        db.query("SELECT * FROM Menu",(err,data)=>{
            if(err){alert("Erreur: \n"+ err);}
            const table=data[0].recette.split(',')
            res.render("pages/test",{data:data[0].nom,price:data[0].prix,recettes:table})
            console.log("envoi des données réussi\n",data)
        })
    })
})
exp.get('/livre_d_or',(req,res)=>{
    res.render("pages/livre",{titre:"Livre d'or"})
})

/**
 * collector of the data sent by the client
 */
let bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exp.post('/livre_d_or', urlencodedParser, function (req, res) {

    if(req.body.mot===''||req.body.mot===undefined){
        res.setHeader('content-type','text/html')
        res.render('pages/error')
    }
    console.log(req.body.mot)
    res.redirect('/livre_d_or')
})
    
exp.get('/sign_in',(req,res)=>{
    res.setHeader('content-type','text/html')
    res.render('pages/sign_in')
})
exp.get('/login',(req,res)=>{
    res.setHeader('content-type','text/html')
    res.end('<h1>It\'s not yet finished :) ,<br> Thank you for your patience ;) </h1>')
})
exp.get('/personnel',(req,res)=>{
    res.setHeader('content-type','text/html')
    res.end('<h1>It\'s not yet finished :) ,<br> Thank you for your patience ;) </h1>')
})
/**
 * Server listening port 
 */
exp.listen(5000)