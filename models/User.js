const { Schema, model } = require('mongoose');

//User Schema
const userSchema = new Schema (
    {
        username: { 
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // Must match a valid email address (look into Mongoose's matching validation)
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            // Array of `_id` values referencing the `Thought` model 
            { type: Schema.Types.ObjectId, ref: 'Thought' }
        ],
        friends: [
            // * Array of `_id` values referencing the `User` model (self-reference)
            { type: Schema.Types.ObjectId, ref: 'User'}
        ]
    },
    { 
        toJSON: { getters: true, virtual: true },
        id: false }
    );

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () { return this.friends.length; })

const User = model('User', userSchema);

module.exports = User;