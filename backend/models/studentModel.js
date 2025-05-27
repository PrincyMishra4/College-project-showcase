const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name: String,
    rollno: { type: String, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    image: { type: String, default: 'Unknown' },
    githubprofile: { type: String, required: true },
    linkedinprofile: { type: String, required: true },
    course: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('students', mySchema);