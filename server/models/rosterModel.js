const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    positions: {
        type: [String],
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    }
}, { collection: 'roster' })

module.exports = mongoose.model('Athlete', athleteSchema);