import express from 'express'

const app = express()

app.use(express.json())

app.listen(4500, ()=>{
    console.log('todo app is listening');
})