# TODO APP ENDPOINTS 
## Description
This is a todo app to test my understanding in working with node and express. A user can create todo, edit todo and delete todo.
When the todo is completed, upon marking done, it is moved to completed todos section. A todo which is overdue has indicative text to show it is overdue.

# Dependences, Frameworks and Languages
- npm
- Node
- Express
- Typescript
- Javascript
- mssql

# Database procedures
## insertTodo
```
CREATE PROCEDURE insertTodo(@id VARCHAR, @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
INSERT INTO todoTable(id, title, description, duedate)
VALUES(@id, @title, @description, @duedate)

END
```
## get single todo
```
CREATE PROCEDURE getTodo(@id VARCHAR)
AS
BEGIN
SELECT id, title, description, duedate FROM todoTable WHERE id=@id

END
```
## get all the todos
```
CREATE PROCEDURE getTodos
AS
BEGIN
SELECT id, title, description, duedate FROM todoTable

END
```
## update a specific todo
```
CREATE PROCEDURE updateTodo(@id VARCHAR, @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
UPDATE todoTable SET title = @title, description = @description, duedate = @duedate WHERE id = @id

END
```
## delete todo
```
CREATE PROCEDURE deleteTodo(@id VARCHAR(50), @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
DELETE FROM todoTable WHERE id = @id

END
```
