import db from '../db/db';

class TodosController {

    getAllTodos(req, res) {
        res.status(200).send({
            success: "true",
            message: "todos retrived successfully",
            todos: db
        })
    }


    createTodo(req, res) {
        if(!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is requied'
            });
        }
        const todo = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description
        }
        db.push(todo);
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully'
        })
    };


    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map(todo => {
            if (todo.id === id){
                return res.status(200).send({
                    success: 'true',
                    message: 'todo retrived successfully',
                    todo
                });
            }
        })
        return res.status(404).send({
            success: 'false',
            message: 'todo does not exist'
        })
    };


    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        db.map((todo, i) => {
            if (todo.id === id) {
                db.splice(i, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'todo deleted successfully'
                });
            }
        })

        return res.status(404).send({
            success: 'false',
            message: 'todo not found'
        });
    };


    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;

        db.map((todo, i) => {
            if (todo.id === id) {
                todoFound = todo;
                itemIndex = i;
            }
        });

        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found'
            });
        }
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                description: 'description is required'
            });
        }

        const updatedTodo = {
            id: todoFound.id,
            title: req.body.title || todoFound.title,
            description: req.body.description || todoFound.description
        };

        db.splice(itemIndex, 1, updatedTodo);

        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            updatedTodo
        });
    };
}

const todoController = new TodosController();
export default todoController;