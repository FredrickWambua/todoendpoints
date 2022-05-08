

CREATE PROCEDURE insertTodo(@id VARCHAR, @title VARCHAR(50), @description VARCHAR(255), @duedate DATE)
AS
BEGIN
INSERT INTO todoTable(id, title, description, duedate)
VALUES(@id, @title, @description, @duedate)

END

