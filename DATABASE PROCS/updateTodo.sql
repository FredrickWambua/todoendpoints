CREATE PROCEDURE updateTodo(@id VARCHAR, @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
UPDATE todoTable SET title = @title, description = @description, duedate = @duedate WHERE id = @id

END