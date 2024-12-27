// import { PrismaClient } from "@prisma/client";

export type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getStaticProps() {
  // const prisma = new PrismaClient()
  // const data = await prisma.task.findMany()

	try {
		const res = await fetch("http://localhost:3000/")
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
  return (
	<ul> 
		{tasks.map((task: Task) => (
			<li key={task.id}>{task.title}</li>
		))}
	</ul>
  )
}
