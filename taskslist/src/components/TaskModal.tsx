import { Task } from '@/components/TaskItem'
import { FiX, FiEdit2, FiTrash2 } from 'react-icons/fi'

type Props = {
  task: Task
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function TaskModal({ task, onClose, onEdit, onDelete }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white min-w-1/2 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FiX size={20} />
        </button>
        <h2 className="break-all min-w-full text-2xl font-bold mb-2">
          {task.title}
        </h2>
        <p 
          className="break-all 
                    text-gray-700 mb-4 whitespace-pre-wrap "
          >
          {task.description}
        </p>
        <span
          className={`inline-block px-2 py-1 rounded-full text-sm font-medium mb-4
            ${task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
        <div className="flex justify-end gap-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <FiEdit2 />
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 hover:underline"
          >
            <FiTrash2 />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}