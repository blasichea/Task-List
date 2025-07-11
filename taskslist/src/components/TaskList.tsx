import { useEffect, useState } from 'react'
import TaskItem, { Task } from '@/components/TaskItem'
import { useRouter } from 'next/router'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const router = useRouter()

  useEffect(() => {
    try {
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => setTasks(data))
      
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
    }
  }, [])

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
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  )
}
