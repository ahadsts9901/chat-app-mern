import { Schema, model } from "mongoose";

let chatSchema = new Schema({

    from_id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    to_id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    text: {
        type: String,
        default: null
    },

    createdOn: {
        type: Date,
        default: Date.now
    },

});

let chatModel;

try {

    chatModel = model('chats');

} catch (error) {

    chatModel = model('chats', chatSchema);

}

export { chatModel };