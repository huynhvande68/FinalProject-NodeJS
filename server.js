require('dotenv').config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
// const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");


const AccountRouter = require('./routers/AccountRouter');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieParser('hvd'));
app.use(session({cookie: { maxAge : 60000}}));
app.use(flash());
app.set('view engine', 'ejs');

app.use('/account', AccountRouter);
app.use(express.static("public"));

app.get('/', (req, res) => {
    if(!req.session.user) {
        return res.redirect('/account/login');
    }
    const user = req.session.user;
  
    res.render('index', {user});
});



const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
})