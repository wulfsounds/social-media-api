const moment = require('moment');
const { Schema, model } = require('mongoose');
const { Types } = require('mysql');

const Thought = model('Thought', thoughtSchema);

// Thought Schema

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            validate: { len: [1-280] }
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
           get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
        },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    { 
        toJSON: { getters: true, virtual: true },
        id: false 
    }
)

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () { return this.reactions.length })

// Reaction Schema .. This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

const reactionSchema = new Schema (
    {
        reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId()
        },
        reactionBody: {
           type: String,
           required: true,
           validate: { len: [1-280] }
        },
        username: {
           type: String,
           required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    { 
        toJSON: { getters: true, virtual: true },
        id: false 
    }
)


module.exports = Thought;