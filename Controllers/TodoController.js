const DBService = require("../Services/DBService")
const formatJsonResponse = require("../Services/JsonResponseService")
const validateInput = require("../Services/ValidationService")
const {ObjectId} = require("mongodb")

//retrieves document based on objectId
const getTodoById = async (req, res) => {
    let id = new ObjectId(req.params.id)
    let msg = 'task retrieved'
    let statusCode = 200

    const collection = await DBService('todos')
    const data = await collection.find({_id: id}).toArray()
    res.json(formatJsonResponse(msg, statusCode, data))
}

//getAllTodos & filer by completed and/or priority
const getAllTodos = async (req, res) => {
    let queryFilter = {}

    if ('completed' in req.query) {
        queryFilter.completed = req.query.completed == 'true' ? true : false
    }

    if (req.query.priority =='high') {
        queryFilter.priority = req.query.priority
    } else if (req.query.priority == 'medium') {
        queryFilter.priority = req.query.priority
    } else if (req.query.priority == 'low') {
        queryFilter.priority = req.query.priority
    }

    let msg = 'relevant tasks displayed'
    let statusCode = 200
    const collection = await DBService('todos')
    const data = await collection.find(queryFilter).toArray()
    res.json(formatJsonResponse(msg, statusCode, data))
}

//validates and adds new document to db (Charlie's code)
const addNewTodo = async (req, res) => {
    let {task, details, priority} = req.body

    if (validateInput(task) == false) {
        let msg = 'did not pass validation, task not added'
        let statusCode = 406
        return res.json(formatJsonResponse(msg, statusCode))
    }

    const collection = await DBService('todos')
    const data = await collection.insertOne({task, details, priority, completed: false})
    if (data.insertedId !== null) {
        let msg = 'task successfully added'
        let statusCode = 200
        res.json(formatJsonResponse(msg, statusCode))
    } else {
        let msg = 'somethings gone wrong, task not added'
        let statusCode = 406
        res.json(formatJsonResponse(msg, statusCode))
    }
}

//edit existing document task field and/or priority field and/or change completed status based on objectId
const editTodo = async (req, res) => {
    let newData = {}

    let task = req.body.task
    let id = new ObjectId(req.body.id)
    let editedPriority = req.body.priority
    let completedTask = req.body.completed

    if (validateInput(task) == false) {
        let msg = 'It has failed validation'
        let statusCode = 406
        return res.json(formatJsonResponse(msg, statusCode))
    }

    if ('task' in req.body) {
        newData.task = task
    }

    if ('priority' in req.body) {
        newData.priority = editedPriority
    }

    if ('completed' in req.body) {
        newData.completed = completedTask
    }

    const collection = await DBService('todos')
    const data = await collection.updateOne({_id: id}, {$set: newData})
    if (data.modifiedCount !== null) {
        let msg = 'its worked and updated your record'
        let statusCode = 200
        res.json(formatJsonResponse(msg, statusCode))
    } else {
        let msg = 'its not worked and not updated your record'
        let statusCode = 406
        res.json(formatJsonResponse(msg, statusCode))
    }
}

//delete existing document (forever!!) based on objectId
const deleteTodo = async (req, res) => {
    let id = new ObjectId(req.body.id)
    let msg = 'task deleted successfully'
    let statusCode = 200

    const collection = await DBService('todos')
    await collection.deleteOne({_id: id})
    res.json(formatJsonResponse(msg, statusCode))
}

exports.getTodoById = getTodoById
exports.addNewTodo = addNewTodo
exports.deleteTodo = deleteTodo
exports.editTodo = editTodo
exports.getAllTodos = getAllTodos