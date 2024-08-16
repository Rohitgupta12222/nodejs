const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/person');
passport.use(new LocalStrategy(async (USER, PASSWORD, done) => {
    console.log('check req user and password', USER, PASSWORD);
    try {
        const user = await Person.findOne({ username: USER })

        if (!user) return done(null, false, { message: 'user is not match' })
        const isPassword = await user.comparePassword(PASSWORD)
        if (isPassword) {
            return done(null, user)
        } else {    
            return done(null, false, { message: 'password is not match' })
        }



    } catch (error) {
        return done(error)
    }
}))



module.exports = passport