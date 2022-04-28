const moment = require('moment');
const { Schema, Types, model } = require('mongoose');

// Reaction Schema .. This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
const ReactionSchema = new Schema (
    {
        reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId()
        },
        reactionBody: {
           type: String,
           required: true,
           maxLength: 280
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
        toJSON: { getters: true, virtuals: true },
        id: false
    }
)

// Thought Schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
           get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
        },
        username: { type: String, required: true },
        reaction: [ReactionSchema]
    },
    { 
        toJSON: { getters: true, virtuals: true },
        id: false 
    }
)

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
ThoughtSchema.virtual('reactionCount').get(function () { 
    return this.reaction.length 
});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;