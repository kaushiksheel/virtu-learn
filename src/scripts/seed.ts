const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Computer Science",
        },
        {
          name: "Algorithms & Data Structures",
        },
        {
          name: "Artificial Intelligence",
        },
        {
          name: "Databases",
        },
        {
          name: "Networking",
        },
        {
          name: "Cybersecurity",
        },
        {
          name: "Software Engineering",
        },
        {
          name: "Operating Systems",
        },
        {
          name: "Machine Learning",
        },
        {
          name: "Web Development",
        },
        {
          name: "Computer Graphics",
        },
      ],
    });

    console.log("successfull");
  } catch (error) {
    console.log("seed :", error);
  } finally {
    await db.$disconnect();
  }
}

main();
