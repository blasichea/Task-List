import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(tasks)

    } catch (error) {
      console.error('Error al buscar la tarea:', error);
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }
  }

  if (req.method === 'POST') {
    const { title, description } = req.body
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Título inválido'})
    }

    if (title.length > 100) {
      return res.status(400).json({ error: 'Máximo 100 caracteres'})
    }

    if (!description 
      || typeof description !== 'string' 
      || description.trim() === '') {
      return res.status(400).json({ error: 'Descripción inválida'})
    }

    if (description.length > 500) {
      return res.status(400).json({ error: 'Máximo 500 caracteres'})
    }

    try {
      const task = await prisma.task.create({
        data: { title, description },
      })
      return res.status(201).json(task)
      
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      return res.status(500).json({ error: 'Tarea no creada' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).end('Método ${req.method} no permitido')
}
