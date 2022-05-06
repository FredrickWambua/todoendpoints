import express from 'express'
import sqlConfig from './Config/config';
import mssql from 'mssql'

const app = express()

app.use(express.json())

app.listen(4500, ()=>{
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