const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    taste: {
        type: String,
        enum: ['sweet', 'soul', 'spicy']
    },
    is_drink: {
        type: Boolean,
        default: false
    }, 
    ingredients: {
        type: [String],
       default:[]
    },
    num_sal: {
        type: Number,
        default: 0

    }
})
const menuItem = mongoose.model('menuItem',menuItemSchema)
module.exports = menuItem