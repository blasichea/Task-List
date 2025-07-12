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
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/tasks/${taskId}` : '/api/tasks'
    const newErrors: typeof errors = {}

    if (!title.trim()) newErrors.title = 'El título es obligatorio'
    if (title.length > 100) newErrors.title = 'Máximo 100 caracteres'

    if (!description.trim()) newErrors.description = 'La descripción es obligatoria'
    if (description.length > 500) newErrors.description = 'Máximo 500 caracteres'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
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
    <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md border border-gray-200 rounded-lg
                p-6 max-w-xl sm:mx-auto mt-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {isEdit ? 'Editar' : 'Nueva'} tarea
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none 
            focus:ring-2
            ${errors.title
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-400'
            }`
          }
          required 
        />
        <p className="text-sm text-right text-gray-500">
          {title.length}/100
        </p>
        {errors.title && 
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-3 py-2 border rounded resize-none 
            focus:outline-none focus:ring-2 
            ${errors.description
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-400'
            }`
          }
          rows={4}
          required
        />
        <p className="text-sm text-right text-gray-500">
          {description.length}/500
        </p>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEdit && (
          <label className="text-sm text-gray-700">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                        border-gray-300 rounded"
            />
            {' '}Completada
          </label>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          type='button'
          onClick={() => router.push('/')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold 
                    px-4 py-2 rounded shadow transition"
        >
          Cancelar
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                    px-4 py-2 rounded shadow transition"
        >
          {isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
