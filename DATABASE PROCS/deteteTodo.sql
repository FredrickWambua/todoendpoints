CREATE PROCEDURE deleteTodo(@id VARCHAR(50), @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
DELETE FROM todoTable WHERE id = @id

END