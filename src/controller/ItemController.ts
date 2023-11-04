import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class ItemController {
	// Criar item
	createItem = async (req: Request, res: Response) => {
		const { name, quantity, typeItem, categoryItem } = req.body
		try {
			const newItem = await prisma.item.create({
				data: {
					name,
					quantity,
					typeItem,
					categoryItem
				}
			})
			res.json(newItem)
		} catch (error) {
			res.status(500).json({ error: 'Erro ao criar um novo item' })
		}
	}

	// Listar items
	listItems = async (req: Request, res: Response) => {
		try {
			const items = await prisma.item.findMany()
			res.json(items)
		} catch (error) {
			res.status(500).json({ error: 'Erro ao buscar itens' })
		}
	}

	editItemById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { name, quantity, typeItem, categoryItem } = req.body
			const item = await prisma.item.update({
				where: { id: Number(id) },
				data: {
					name,
					quantity,
					typeItem,
					categoryItem
				}
			})
			
			if (!item) return res.json({ message: 'item not found'})

			res.send(item)
		} catch(error) {
			res.status(500).send({ error: 'Error, in update item ' })
		}
	}

	// Delete item by Id
	deleteItemById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const item = await prisma.item.delete({
				where: { id: Number(id) }
			})

			if (!item) return res.json({ message: 'item not found' })

			res.status(200).json({ message: 'item deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: 'Error, in delete item' })
		}
	}
}

export default new ItemController()
