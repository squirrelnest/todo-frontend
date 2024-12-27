import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const task3 = await prisma.task.create({
		data: {
			title: "build castle",
			completed: false,
			color: "green",
		}
	})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })