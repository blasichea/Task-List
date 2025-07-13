import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TaskForm from '@/components/TaskForm'
import { Task } from '@/types/task'

export default function EditTaskPage() {
  const router = useRouter()
  const { id } = router.query
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    if (id) {
      try {
        fetch(`/api/tasks`)
          .then(res => res.json())
          .then(data => {
            const found = data.find((t: Task) => t.id === Number(id))
            setTask(found)
          })
        
      } catch (error) {
        console.error('Error buscando tarea:', error);
      }
    }
  }, [id])

  if (!task) return <p className="p-4">Cargando...</p>

  return <TaskForm initialData={task} isEdit taskId={task.id} />
}
