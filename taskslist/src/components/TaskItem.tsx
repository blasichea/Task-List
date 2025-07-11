export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}

type Props = {
  task: Task
  onEdit: () => void
  onDelete: () => void
}

export default function TaskItem({ task, onEdit, onDelete }: Props) {

  return (
    <div>
      <div>
        <h2>{task.title}</h2>
        <span>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </div>
      <p>{task.description}</p>
      <div>
        <button 
          onClick={onEdit}
        >
          Editar
        </button>
        <button 
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
