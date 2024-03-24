var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

let counter = 0;

app.get('/test/*', function(req, res) {

  var endpoint = req.url.substring(6); // On enlève "/test/" qui a 6 caractères

  var responseObject = { "msg": endpoint };
  res.json(responseObject);
});

// Route query
app.get('/cpt/query', (req, res) => {
  res.json({ "compteur": counter });
});


// Route pour incrémenter counter
app.get('/cpt/inc', (req, res) => {
  if (req.query.v) {
    const value = parseInt(req.query.v);
    if (!isNaN(value)) {
      counter += value;
      res.json({ "code": 0 });
    } else {
      res.json({ "code": -1 });
    }
  } else {
    counter++;
    res.json({ "code": 0 });
  }
});



var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// Route pour récupérer un message par son numéro
app.get('/msg/get/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    res.json({ "code": 1, "msg": allMsgs[num] });
  } else {
    res.json({ "code": 0 });
  }
});

// Route pour récupérer tous les messages
app.get('/msg/getAll', (req, res) => {
  res.json(allMsgs);
});

// Route pour récupérer le nombre de messages
app.get('/msg/nber', (req, res) => {
  res.json(allMsgs.length);
});

// Route pour ajouter un nouveau message
app.post('/msg/post/:message', (req, res) => {
  const message = unescape(req.params.message);
  allMsgs.push(message);
  res.json({ "num": allMsgs.length - 1 }); // Renvoie le numéro du nouveau message
});

// Route pour supprimer un message de la liste
app.post('/msg/del/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    allMsgs.splice(num, 1);
    res.json({ "code": 1 });
  } else {
    res.json({ "code": 0 });
  }
});

// Route pour tout supprimer
app.post('/msg/deleteAll', (req, res) => {
  allMsgs.splice(0, allMsgs.length);
  res.json({ "code": 1 });
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

