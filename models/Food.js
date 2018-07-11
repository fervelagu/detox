const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        //unique: true
    },
    //location: {
        //type: String,
        //coordinates: [
            //Number:
        //]
    //}
    calories: Number,
    ingredients: [String],
    hasSugar: Boolean,
    price: Number,
    taste: String,
    tipo: {
        type: String,
        enum: ['dessert', 'plate', 'exotic'],
        default: 'plate'        
    }
}, {
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});

module.exports = mongoose.model('Food', foodSchema);