import { Router } from "express";
import itemController from '../controller/ItemController'; 

const itemsRouter = Router()

itemsRouter.get('/items', itemController.listItems)
itemsRouter.post('/items', itemController.createItem)
itemsRouter.put('/items/:id', itemController.editItemById)
itemsRouter.delete('/items/:id', itemController.deleteItemById)

export default itemsRouter
