import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding started...");

  const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
  const coursesFilePath = path.join(process.cwd(), 'app/data/courses.json');

  const users = JSON.parse(await fs.readFile(usersFilePath, 'utf-8'));
  const courses = JSON.parse(await fs.readFile(coursesFilePath, 'utf-8'));

  for (const course of courses) {
    const { prerequisites, schedule, ...courseData } = course;

    await prisma.course.create({
      data: {
        ...courseData,
        prerequisites: prerequisites?.length
          ? { create: prerequisites }
          : undefined,
        schedule: schedule?.length
          ? { create: schedule }
          : undefined
      }
    });
  }

  for (const user of users) {
    const {
      completedCourses,
      inProgressCourses,
      pendingCourses,
      assignedCourses,
      ...userData
    } = user;

    await prisma.user.create({
      data: {
        ...userData,
        completedCourses: completedCourses?.length
          ? { create: completedCourses }
          : undefined,
        inProgressCourses: inProgressCourses?.length
          ? { create: inProgressCourses }
          : undefined,
        pendingCourses: pendingCourses?.length
          ? { create: pendingCourses }
          : undefined
      }
    });
  }

  console.log("Seeding completed successfully!");
}

seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma disconnected.");
  });
