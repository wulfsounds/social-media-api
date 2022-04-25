const { Schema, model } = require('mongoose');

// Thought Schema

const thoughtSchema = new Schema (
    {
        thoughtText: {
            /*
                * String
                * Required  
                * Must be between 1 and 280 characters
            */
        },
        createdAt: {
            /*
                * Date
                * Set default value to the current timestamp
                * Use a getter method to format the timestamp on query
            */
        },
        username: {
            /* 
                * String
                * Required
            */
        },
        reactions: {
            /*
                * Array of nested documents created with the `reactionSchema`
            */
        }
    }
    // Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
)

// Reaction Schema

const reactionSchema = new Schema (
    {
        reactionId: {
            /*  
                * Use Mongoose's ObjectId data type
                * Default value is set to a new ObjectId 
            */
        },
        reactionBody: {
            /*  
                * String
                * Required
                * 280 character maximum
            */
        },
        username: {
            /* 
                * String
                * Required
            */
        },
        createdAt: {
            /*
                * Date
                * Set default value to the current timestamp
                * Use a getter method to format the timestamp on query
            */
        }
    }
    // This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
)