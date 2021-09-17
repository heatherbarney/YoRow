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
    boatClass: {
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
  })

const positionSchema = new Schema({
    number: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    name: {
        type: String,
    }
})

const lineupSchema = new Schema({
    seats: [positionSchema],
})

const practiceSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    lineups: [lineupSchema],
    boats: [boatSchema]
})

module.exports = mongoose.model('practices', practiceSchema);