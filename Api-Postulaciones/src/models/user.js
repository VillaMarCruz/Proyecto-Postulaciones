const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
        ]
    },
    { timestamps: true },
    { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);