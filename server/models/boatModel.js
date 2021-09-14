const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    number: {
        type: Number,
        required: true,
        minimum: 1,
        maximum: 8
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
    seats: [seatSchema],
    available: {
        type: Boolean,
        required: true
    },
    seatNum: {
        type: Number,
        required: true,
        minimum: 1,
        maximum: 8
    }
  }, { collection: 'boats' });

  module.exports = mongoose.model('boat', boatSchema);