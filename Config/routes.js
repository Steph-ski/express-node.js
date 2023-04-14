const ToDoController = require('../Controllers/TodoController')

const routes = (app) => {
    app.get('/todos', ToDoController.getAllTodos)

    app.post('/todos', ToDoController.addNewTodo)

    app.get('/todos/:id', ToDoController.getTodoById)

    app.put('/todos', ToDoController.editTodo)

    app.delete('/todos', ToDoController.deleteTodo)
}

module.exports = routes