import Link from 'next/link'
import { useRouter } from 'next/navigation';

export type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getStaticProps() {
	try {
		const res = await fetch("http://localhost:8080/")
		if (!res.ok) {
			throw new Error(
				`Unable to Fetch Data, Please check URL or Network connectivity!!`
			)
		}

		const data = await res.json()
		const tasks = JSON.parse(JSON.stringify(data))
	
		return {
			props: { data: tasks }
		}

	} catch(error) {
		console.error('Failed to fetch data:', error);
	}
}

export default function Home({ data: tasks }: { data: Task[] }) {

	const router = useRouter();

	const handleDelete = async (id: number) => { 
		try {
			await fetch(
			`http://127.0.0.1:8080/tasks/${id}`, 
				{
					method: "delete",
					headers: {'Content-Type':'application/json'},
					mode: 'cors',
				}
			)
			router.push('/');
		} catch (err) {
			console.log(err)
		}
	}

	const handleStatus = async (id: number, completed: boolean) => { 
		console.log(completed)
		try {
			await fetch(
			`http://127.0.0.1:8080/tasks/${id}`, 
				{
					method: "put",
					headers: {'Content-Type':'application/json'},
					mode: 'cors',
					body: JSON.stringify({ 
						completed: completed 
					})
				}
			)
			router.push('/');
		} catch (err) {
			console.log(err)
		}
	}

  return (
	<>
		<div className="flex flex-col text-white justify-center grid-flow-row w-96">
			<h1 className="flex bg-black text-white justify-center text-4xl font-black mb-12">Todo App</h1>
			<Link href="/task" className="flex bg-blue-600 p-4 mb-16 rounded-sm justify-center">Create Task</Link>
			<div className="flex flex-col gap-4"> 
				{tasks.map((task: Task) => (
					<div className="flex basis-1 justify-between gap-4 p-4 bg-slate-800 border-1 border-slate-200 rounded-sm" key={task.id}>
						<div className="flex cursor-pointer" onClick={() => handleStatus(task.id, task.completed)}>
							{ task.completed 
								? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
										<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
									</svg>
								: <input type="checkbox" id="status" name="status" className="appearance-none w-5 h-5 border rounded-full border-blue-400" />
							}
							<div key={task.id} className="text-white text-sm ml-4">{task.title}</div>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => handleDelete(task.id)}>
							<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
					</div>
				))}
			</div>
		</div>
	</>
  )
}
