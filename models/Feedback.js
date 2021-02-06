const mongose = require('mongoose');

const FeedbackSchema = mongose.Schema({
    user: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name :{
        type: String
    },
    anonymous: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Feedback = mongose.model('feedback', FeedbackSchema);