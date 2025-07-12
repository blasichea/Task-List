import { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import TaskModal from '@/components/TaskModal'

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
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div 
        className="bg-white shadow-md border border-gray-200 rounded-lg flex
                  flex-col p-4 gap-2 transition hover:shadow-xl/20 
                  cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-start">
          <h2 
            className="text-lg md:text-xl font-semibold text-gray-800 truncate"
          >
            {task.title}
          </h2>
          <span
            className={`text-sm px-2 py-1 rounded-full font-medium 
              ${task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>
        <p 
          className="min-h-[50px] break-all line-clamp-3 text-ellipsis text-md 
                    text-gray-600"
        >
          {task.description}
        </p>
        <div className="flex gap-3 justify-end mt-2">
          <button 
            onClick={onEdit}
            className="flex items-center gap-1 text-blue-600 hover:underline
                      text-sm"
          >
            <FiEdit2 className="text-base" />
            Editar
          </button>
          <button 
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 hover:underline text-sm"
          >
            <FiTrash2 className="text-base" />
            Eliminar
          </button>
        </div>
      </div>
      {showModal && (
        <TaskModal
          task={task}
          onClose={() => setShowModal(false)}
          onEdit={() => {
            setShowModal(false)
            onEdit()
          }}
          onDelete={() => {
            setShowModal(false)
            onDelete()
          }}
        />  
      )}
    </>
  )
}
