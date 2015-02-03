/**
 * Created by Johnny on 2015/1/27.
 */
var everyauth = require('everyauth');
var users = require('./users.json');

everyauth.debug = true;

everyauth.everymodule
    .findUserById(function (id, callback) {
        console.log(id);
        console.log(users);
        callback(null, users[id]);
    });

everyauth
    .password
    .loginWith('login')
    .getLoginPath('/manager')
    .postLoginPath('/login')
    .loginView('manager')
    .loginLocals({
        title: 'MITLAB Manager'
    })
//    .loginLocals(function (req, res) {
//      return {
//        title: 'Login'
//      }
//    })
//    .loginLocals( function (req, res, done) {
//     setTimeout( function () {
//      done(null, {
//          title: 'Async login'
//        });
//      }, 200);
//    })
    .authenticate( function (login, password) {
        var errors = [];
        if (!login || !password)
            errors.push('Missing username or password');
        if (errors.length)
            return errors;

        var user = users[login];
        console.log(login);
        console.log(password)
        if (!user)
            return ['Username non-exists'];
        if (user.password !== password)
            return ['Wrong password'];
        return user;
    })

    .getRegisterPath('/register')
    .postRegisterPath('/register')
    .registerView('register.jade')
//    .registerLocals({
//      title: 'Register'
//    })
//    .registerLocals(function (req, res) {
//      return {
//        title: 'Sync Register'
//      }
//    })
    .registerLocals( function (req, res, done) {
        setTimeout( function () {
            done(null, {
                title: 'Async Register'
            });
        }, 200);
    })
    .validateRegistration( function (newUserAttrs, errors) {
        var login = newUserAttrs.login;
        if (usersByLogin[login]) errors.push('Login already taken');
        return errors;
    })
    .registerUser( function (newUserAttrs) {
        var login = newUserAttrs[this.loginKey()];
        return usersByLogin[login] = addUser(newUserAttrs);
    })
    .loginSuccessRedirect('/manager')
    .registerSuccessRedirect('/');

module.exports = everyauth;