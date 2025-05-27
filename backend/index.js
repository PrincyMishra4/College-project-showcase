//importing express
const express = require('express');
const UserRouter = require('./routers/userRouter');
const ProjectRouter = require('./routers/projectRouter');
const studentRouter = require('./routers/studentRouter');
const cors = require('cors');

// initialize express 
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/user', UserRouter)
app.use('/project', ProjectRouter)
app.use('/student', studentRouter)


// route or endpoint
app.get('/', (req, res) => {
    res.send('Response from express');
});

app.get('/add', (req, res) => {
    res.send('Response from add');
});

app.get('/update', (req, res) => {
    res.send('Response from update');
});

app.get('/getall', (req, res) => {
    res.send('Response from getall');
});

app.listen(port, () => { console.log('server started') });