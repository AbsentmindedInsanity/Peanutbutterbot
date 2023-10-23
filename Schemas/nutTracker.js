const { model, Schema } = require("mongoose");

module.exports = model ("NutTracker", new Schema ({
    User: String,
    UserTag: String,
    NutCount: Number
}));