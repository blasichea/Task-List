import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido'})
  }

  const taskId = parseInt(id)

  if (req.method === 'PUT') {
    const { title, description, completed } = req.body

    try {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          title,
          description,
          completed,
        },
      })
      return res.status(200).json(updatedTask)

    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({ where: { id: taskId } })
      return res.status(204).end()
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE'])
  return res.status(405).end('Método ${req.method} no permitido')
}
