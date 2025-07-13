import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' })
  }

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) return res.status(400).json({ error: 'Ya existe un usuario con ese email' })

  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })

  res.status(201).json({ success: true })
}
