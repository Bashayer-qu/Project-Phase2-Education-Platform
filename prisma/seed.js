import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import path from 'path';


const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
const courseFilePath = path.join(process.cwd(), 'app/data/courses.json');
async function seed(params) {
    console.log("Seeding started...");
    const users = await fetch(usersFilePath);
    for (const user of users) {

        await prisma.user.create({
            data: user
        });
    }

    const courses = await fetch(courseFilePath);

    for (const course of courses) {
        await prisma.course.create({
            data: course
        });
    }
    console.log("Seeding completed successfully!");




}

seed().catch((e) => {
    console.error(e);

}).finally(async () => {
    await prisma.$disconnect();
    console.log("Seeding Completed.");
})


