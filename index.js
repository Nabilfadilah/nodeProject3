const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./User')
  
const app = express()
const port = 3001
 
app.use(cors())
app.use(express.json())
  
main().catch(err => console.log(err));
 
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/nodeexpressdb', {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}
 
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
 
// get user
app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
  
// get user by id  
app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})
  
// create user
app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
  
// edit user
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})
  
// delete user
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})