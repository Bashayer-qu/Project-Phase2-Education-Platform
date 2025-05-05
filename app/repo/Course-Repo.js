import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class CourseRepo {

  async getAllCourses() {
    return await prisma.course.findMany({
      include: {
        schedule: true,
        prerequisites: true
      }
    })
  }

  async getCourseById(courseId) {
    return await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      include: {
        schedule: true,
        prerequisites: true
      }
    })
  }

  async createCourse(courseData) {
    return await prisma.course.create({ data: courseData })
  }

  async updateCourse(courseId, updatedData) {
    return await prisma.course.update({
      where: { id: parseInt(courseId) },
      data: updatedData
    })
  }

  async deleteCourse(courseId) {
    return await prisma.course.delete({
      where: { id: parseInt(courseId) }
    })
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        completedCourses: true,
        inProgressCourses: true,
        pendingCourses: true
      }
    })
  }

  async getUserByUsername(username) {
    return await prisma.user.findUnique({
      where: { username },
      include: {
        completedCourses: true,
        inProgressCourses: true,
        pendingCourses: true
      }
    })
  }

  async createUser(userData) {
    return await prisma.user.create({ data: userData })
  }

  async updateUser(username, updatedData) {
    return await prisma.user.update({
      where: { username },
      data: updatedData
    })
  }

  async deleteUser(username) {
    return await prisma.user.delete({ where: { username } })
  }

  async addCompletedCourse(data) {
    return await prisma.completedCourse.create({ data })
  }

  async addInProgressCourse(data) {
    return await prisma.inProgressCourse.create({ data })
  }

  async addPendingCourse(data) {
    return await prisma.pendingCourse.create({ data })
  }
}

export default new CourseRepo()
