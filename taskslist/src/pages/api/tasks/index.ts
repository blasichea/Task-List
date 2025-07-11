import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
        return res.status(200).json(tasks)
    }

    if (req.method === 'POST') {
        const { title, description } = req.body
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Título inválido'})
        }

        if (!description || typeof description !== 'string') {
          return res.status(400).json({ error: 'Descripción inválida'})
        }

        const task = await prisma.task.create({
            data: { title, description },
        })

        return res.status(201).json(task)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end('Método ${req.method} no permitido')
}
