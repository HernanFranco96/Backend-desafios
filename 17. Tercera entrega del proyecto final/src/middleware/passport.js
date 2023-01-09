const passport = require('passport');
const bCrypt = require('bcrypt');
const mongoose = require('mongoose');
const { option } = require('../moduls/config');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../moduls/Schema/user');
const { sendMail } = require('../nodemailer/nodemailer');
const Cart = require('../class/Cart');

const cart = new Cart();

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (username, password) => {
    return bCrypt.compareSync(password, username.passwordHash)
}

const initPassport = () => { 
    try {
        mongoose.connect(option.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err)
    }
    
    passport.use('login', new LocalStrategy(
        (username, password, done) => {
            console.log('Login')
            User.findOne({username: username}, (err, user) => {
                if (err)
                    return done(err);
                if (!user) {
                    console.log(`El usuario ${username} no existe.`);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.log('Contraseña invalida');
                    return done(null, false);
                }
                return done(null, user);
            });
        })
    );
    
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true},
        (req, username, password, done) => {
            console.log('Signup');
            let file = req.file;
            const { name, address, age, phone } = req.body;
            User.findOne({username: username}, (err, user) => {
                if(err){
                    console.log('Error al registrar usuario.')
                    return done(err);
                };
                if (user) {
                    console.log('El usuario ya existe.');
                    return done(null, false)
                }

                let idCart;
                cart.createCart().then(resp => { idCart = JSON.parse(resp) });
                console.log(idCart)
                let newUser = new User({
                    username,
                    passwordHash: createHash(password),
                    name,
                    address,
                    age,
                    phone: JSON.stringify(phone),
                    photo: file.path,
                    idCart
                });
                
                User.create(newUser, (err, id) => {
                    if (err) {
                        console.log('Error al guardar el usuario: ' + err);
                        return done(err);
                    }
                    sendMail(newUser);
                    console.log(user);
                    console.log('Usuario registrado con exito.');
                    return done(null, id);
                });
            })
        }
    ));
};

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

module.exports = { initPassport };