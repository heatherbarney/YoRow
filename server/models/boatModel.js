const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Bow', 'Stroke', 'Single Sculler', '1', '2', '3', '4', '5', '6', '7', '8']
    },
    number: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    side: {
        type: String,
        required: true,
        enum: ['Port', 'Starboard', 'Scull']
    }
});

const boatSchema = new Schema({
    name: { 
        type: String,
        required: true, 
        trim: true 
    },
    class: {
        type: String,
        required: true,
        trim: true,
        enum: ['Single', 'Double', 'Four', 'Eight', 'Pair', 'Quad', 'Octuple']
    },
    abbrev: {
        type: String,
        required: true,
        trim: true,
        enum: ['1x', '2x', '2-', '2+', '4x', '4x+', '4-', '4+', '8+', '8x+']
    },
    coxed: {
        type: Boolean,
        required: true,
    },
    sweep: {
        type: Boolean,
        required: true,
    },
    seats: [seatSchema]
  }, { collection: 'boats' });

  module.exports = mongoose.model('boat', boatSchema);