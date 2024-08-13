const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['manager', 'waiter', 'chef'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function (next) {
    const person = this
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt)
        person.password = hashPassword
        next()
    } catch (error) {
       return next(error)
    }


})
personSchema.methods.comparePassword =  function(candidatePassword){
    try {
        return  bcrypt.compare(candidatePassword,this.password)
    } catch (error) {
       throw error
    }
}



const Person = mongoose.model('Person', personSchema)
module.exports = Person