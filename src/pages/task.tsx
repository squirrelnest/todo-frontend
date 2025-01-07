import { useState } from 'react'
import { useRouter } from 'next/navigation'

export type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Task() {
	const router = useRouter();
	const [title, setTitle] = useState("")

	const handleClick = async () => { 
			try {
				await fetch(
					"http://127.0.0.1:8080/tasks", 
					{
						method: "post",
						headers: {'Content-Type':'application/json'},
						body: JSON.stringify({ 
							title: title,
							color: "red",
							completed: false 
						}),
						mode: 'cors',
					}
				)
				router.push('/');
			} catch (err) {
				console.log(err)
			}
		}

  return (
		<div className="grid gap-4 w-96">
			<h1>Todo App</h1>
			<label htmlFor="title" className="text-blue-600">Title</label>
			<input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} className="flex basis-1 gap-4 p-4 bg-slate-800 text-white border-1 border-slate-200 rounded-sm"/>
			<button onClick={handleClick} className="flex bg-blue-600 p-4 mb-16 rounded-sm justify-center text-white">Add Task</button>
		</div>
  )
}
