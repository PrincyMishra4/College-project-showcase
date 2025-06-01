const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    title : String,
    image: { type : String },
    video : { type : String, required : true },
    department : { type : String, required : true },
    description : { type: String, default: 'Unknown'},
    githublink : { type : String, required : true },
    viewlink : { type : String, required : true },
    category : { type : String, required : true },
    developedby : { type : Types.ObjectId, ref : 'students' },
    approved : { type : Boolean, default : false },
    createdAt : { type : Date, default : Date.now }
});

module.exports = model('projects', mySchema); // projects is collection name