import { useState } from 'react';

export type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Task() {
	const [title, setTitle] = useState("")

	const handleClick = async () => { 
			console.log(JSON.stringify({ title: title }))
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
			} catch (err) {
				console.log(err)
			}
		}

  return (
		<>
			<h1>Todo App</h1>
			<label htmlFor="title">Title</label>
			<input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
			<button onClick={handleClick}>Add Task</button>
		</>
  )
}
