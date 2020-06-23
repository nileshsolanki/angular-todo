const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    complete: {
        type: Number,
        required: true,
        default: 0,
    },
    incomplete: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    }
    // with auth
    // _userId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // }

})

const List = mongoose.model('List', ListSchema);

module.exports = { List }