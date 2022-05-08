import express from 'express'
import sqlConfig from './Config/config';
import mssql from 'mssql'
import cors from 'cors'
import router from './Routes/router'
import bodyParser from 'body-parser'

const app = express()
// app.use(cors)
app.use(express.json())
app.use('/todo', router)

app.listen(8000, ()=>{
    console.log('todo app is listening');
})

const checkConnection = async()=>{
    await mssql.connect(sqlConfig).then(
        todoapp=>{
            if(todoapp.connected){
                console.log('todo app is connected to database')
            }
        }
    ).catch(err=>{
        console.log(err.message);
    })
}

checkConnection()