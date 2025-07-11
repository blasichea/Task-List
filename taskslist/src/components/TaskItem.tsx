import { useRouter } from 'next/router'

export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}

type Props = {
  task: Task
  onDelete: (id:number) => void
}

export default function TaskItem({ task, onDelete }: Props) {
  const router = useRouter()

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
        <button onClick={() => router.push(`/tasks/${task.id}`)}>
          Editar
        </button>
        <button onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
