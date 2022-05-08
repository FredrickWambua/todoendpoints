"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.getTodo = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../Config/config"));
const mssql_1 = __importDefault(require("mssql"));
// creating a todo
const createTodo = async (req, res) => {
    try {
        const id = (0, uuid_1.v1)();
        const { title, description, duedate } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('duedate', mssql_1.default.Date, duedate)
            .execute('insertTodo');
        return res.json({ message: `new todo with id: ${id} created` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.createTodo = createTodo;
// getting a single todo
const getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const todo = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getTodo');
        if (!todo.recordset) {
            return res.json({ message: `Todo with id: ${id} do not exist ` });
        }
        return res.json(todo.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getTodo = getTodo;
// getting all the todos record sets
const getTodos = async (req, res) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const todos = await pool.request().execute('getTodos');
        if (!todos.recordset)
            return res.json({ message: `There are no todos yet` });
        return res.json(todos.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getTodos = getTodos;
// updating a specific todo
const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, duedate } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        const todo = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getTodo');
        if (!todo.recordset)
            return res.json({ message: `Todo with the id: ${id} do not exist!` });
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('duedate', mssql_1.default.Date, duedate)
            .execute('updateTodo');
        if (!todo.recordset[0])
            return res.json({ message: `Todo with id: ${id} do not exist ` });
        return res.json({ message: `Todo with id : ${id} has been updated successfully` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.updateTodo = updateTodo;
// deleting a todo
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, duedate } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        const todo = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getTodo');
        if (!todo.recordset)
            return res.json({ message: `Todo with id: ${id} do not exist ` });
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('duedate', mssql_1.default.Date, duedate)
            .execute('deleteTodo');
        return res.json({ message: `${id} deleted successfully` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.deleteTodo = deleteTodo;
