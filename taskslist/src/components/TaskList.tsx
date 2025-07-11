import { useEffect, useState } from 'react'
import TaskItem, { Task } from '@/components/TaskItem'
import { useRouter } from 'next/router'

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
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
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
    <div>
      <h1>Mis Tareas</h1>
      <button onClick={() => router.push('/tasks/new')}>
        + Nueva Tarea
      </button>
      <div>
        <input 
          type="text"
          placeholder='Buscar...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => router.push(`/tasks/${task.id}`)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      ) : (<p>No se encontraron tareas que coincidan.</p>)
      }
    </div>
  )
}
