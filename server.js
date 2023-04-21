const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const bcrypt = require('bcryptjs');


app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('login', { layout: false });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  if (username != undefined && password != undefined && username != "" && password != "") {
    bcrypt.hash(password, 10).then(hash=>{ 
      res.render('success',  { layout: false, username, hash });
    })
    .catch(err=>{
        console.log(err);
    });
  }
  else
  {
    res.render('login', { layout: false });
  }

});

// app.get('/success', (req, res) => {
//   res.render('login', { layout: false });
// });

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});