// pages/tasks/index.tsx
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import TaskList from '@/components/TaskList'

interface TasksPageProps {
  userName: string
}

export default function TasksPage({ userName }: TasksPageProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white px-4 py-3 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Hola, {userName}</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      userName: session.user.name,
    },
  }
}
