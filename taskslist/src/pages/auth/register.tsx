import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    if (res.ok) router.push('/auth/login')
    else alert('Error al registrar usuario')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded shadow mt-10">
      <div className="flex justify-center items-center gap-2 mb-6">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={48}
          height={48}
          className="mb-2"
        />
        <h1 className="text-shadow-lg text-2xl font-bold text-gray-800">TaskList</h1>
      </div>
      <h2 className="text-2xl font-bold">Crear cuenta</h2>
      <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2" />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Registrarse</button>
      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tenés una cuenta?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
