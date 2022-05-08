"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./Config/config"));
const mssql_1 = __importDefault(require("mssql"));
const router_1 = __importDefault(require("./Routes/router"));
const app = (0, express_1.default)();
// app.use(cors)
app.use(express_1.default.json());
app.use('/todo', router_1.default);
app.listen(8000, () => {
    console.log('todo app is listening');
});
const checkConnection = async () => {
    await mssql_1.default.connect(config_1.default).then(todoapp => {
        if (todoapp.connected) {
            console.log('todo app is connected to database');
        }
    }).catch(err => {
        console.log(err.message);
    });
};
checkConnection();
