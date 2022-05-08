import {v1 as uid} from 'uuid'
import sqlConfig from '../Config/config'
import mssql from 'mssql'
import {RequestHandler, Request, Response} from 'express'


interface Todo {
    id: string
    title: string
    description: string
    duedate: string
}


// creating a todo
export const createTodo = async(req:Request, res:Response)=>{
    try {
        const id = uid() 
        const {title, description, duedate} = req.body as Todo
        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('id', mssql.VarChar, id)
        .input('title', mssql.VarChar, title)
        .input('description', mssql.VarChar, description)
        .input('duedate', mssql.Date, duedate)
        .execute('insertTodo')
        
        return res.json({message:`new todo with id: ${id} created`})

    } catch (error:any) {
        res.json({error:error.message})
    }
}



// getting a single todo
export const getTodo:RequestHandler = async(req, res)=>{
    try {
        const id = req.params.id
        let pool = await mssql.connect(sqlConfig)
        const todo = await pool.request()
        .input('id',mssql.VarChar, id)
        .execute('getTodo')
        if(!todo.recordset){
            return res.json({message:`Todo with id: ${id} do not exist `})
        } 
        return res.json(todo.recordset)
    } catch (error:any) {
        res.json({error:error.message})
    }    
}
// getting all the todos record sets
export const getTodos:RequestHandler = async(req, res)=>{
    try {
        let pool = await mssql.connect(sqlConfig)
        const todos = await pool.request().execute('getTodos')
        if(!todos.recordset) return res.json({message:`There are no todos yet`})
        return res.json(todos.recordset)
    } catch (error:any) {
        res.json({error:error.message})
    }
    
}

// updating a specific todo
export const updateTodo:RequestHandler = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const {title, description, duedate} = req.body as Todo
        let pool = await mssql.connect(sqlConfig)
        const todo = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getTodo')
        if(!todo.recordset) return res.json({message:`Todo with the id: ${id} do not exist!`})
        await pool.request()
        .input('id', mssql.VarChar, id)
        .input('title', mssql.VarChar, title)
        .input('description', mssql.VarChar, description)
        .input('duedate', mssql.Date, duedate)
        .execute('updateTodo')
        if(!todo.recordset[0]) return res.json({message:`Todo with id: ${id} do not exist `})
        return res.json({message:`Todo with id : ${id} has been updated successfully`})
    } catch (error:any) {
        res.json({error:error.message})
    }    
}

// deleting a todo

export const deleteTodo:RequestHandler = async(req, res)=>{
    try {
        const id = req.params.id
        const {title, description, duedate} = req.body as Todo
        let pool = await mssql.connect(sqlConfig)
        const todo = await pool.request()
        .input('id',mssql.VarChar, id)
        .execute('getTodo')
        if(!todo.recordset) return res.json({message:`Todo with id: ${id} do not exist `})
        await pool.request()
        .input('id',mssql.VarChar, id)
        .input('title', mssql.VarChar, title)
        .input('description', mssql.VarChar, description)
        .input('duedate', mssql.Date, duedate)
        .execute('deleteTodo')
        return res.json({message:`${id} deleted successfully`})
    } catch (error:any) {
        res.json({error:error.message})
    }    
}
