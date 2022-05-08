CREATE PROCEDURE getTodos
AS
BEGIN
SELECT id, title, description, duedate FROM todoTable

END

