import express from 'express';
import TodoController from '../todosControllers/todos';

const router = express.Router();

router.get('/api/v1/todos', TodoController.getAllTodos);
router.get('/api/v1/todos/:id', TodoController.getTodo);
router.post('/api/v1/todos', TodoController.createTodo);
router.delete('/api/v1/todos/:id', TodoController.deleteTodo);
router.put('/api/v1/todos/:id', TodoController.updateTodo);

export default router;