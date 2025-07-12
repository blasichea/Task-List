import { useEffect, useState } from 'react'
import TaskItem, { Task } from '@/components/TaskItem'
import { useRouter } from 'next/router'
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  useEffect(() => {
    try {
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => setTasks(data))
      
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
    }
  }, [])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = filter === 'all' ||
                          (filter === 'completed' && task.completed) ||
                          (filter === 'pending' && !task.completed)

    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE'})
      setTasks(tasks.filter(task => task.id !== id))
      
    } catch (error) {
      console.error('Error borrando datos:', error);
    }
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b 
                from-gray-300 to-blue-100 py-10 px-4"
    >
      <div className="max-w-0.9 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Mis Tareas
        </h1>
        <div className="mb-6 flex flex-col md:flex-row md:items-center 
                        md:justify-between gap-4"
        >
          <button 
            onClick={() => router.push('/tasks/new')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                       text-white font-semibold px-4 py-2 rounded shadow 
                       transition w-fit"
          >
            <FiPlus className="text-lg" />
            Nueva Tarea
          </button>
          <div className="relative w-full sm:w-64">
            <FiSearch 
              className="absolute left-3 top-1/2 -translate-y-1/2 
                        text-gray-400"
            />
            <input
              className="pl-10 pr-3 py-2 w-full border border-gray-400 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              placeholder='Buscar...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter
              className="absolute left-3 top-1/2 -translate-y-1/2 
                        text-gray-400"
            />
            <select
              className="pl-10 pr-3 py-2 border border-gray-400 rounded 
                        focus:outline-none focus:ring-2 focus:ring-blue-400 
                        transition"
              value={filter}
              onChange={(e) => setFilter(
                e.target.value as 'all' | 'completed' | 'pending')
              }
            >
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => router.push(`/tasks/${task.id}`)}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No se encontraron tareas que coincidan.
            </p>
          )
          }
        </div>
      </div>
    </div>
  )
}
