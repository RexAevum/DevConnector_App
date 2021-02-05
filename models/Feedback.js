const mongose = require('mongoose');

const FeedbackSchema = mongose.Schema({
    user: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name :{
        type: String,
        default: "Anonymous"
    },
    title: {
        type: String,
        required: true
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