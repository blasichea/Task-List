import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res?.ok) router.push('/tasks')
    else setError('Credenciales inválidas')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-4 shadow bg-white rounded">
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
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border mb-2 p-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full border mb-4 p-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Entrar</button>
      <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tenés una cuenta?{' '}
        <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
          Registrate acá
        </Link>
      </p>

    </form>
  )
}
