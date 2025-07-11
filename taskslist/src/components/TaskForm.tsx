import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  initialData?: {
    title: string
    description: string
    completed: boolean
  }
  isEdit?: boolean
  taskId?: number
}

export default function TaskForm({ initialData, isEdit=false, taskId }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [completed, setCompleted] = useState(initialData?.completed || false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/tasks/${taskId}` : '/api/tasks'

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, description, completed}),
      })
      router.push('/')
      
    } catch (error) {
      console.error('Error obteniendo datos:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar' : 'Nueva'} tarea</h2>
      <input 
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {isEdit && (
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          {' '}Completada
        </label>
      )}
      <button>
        {isEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  )
}
