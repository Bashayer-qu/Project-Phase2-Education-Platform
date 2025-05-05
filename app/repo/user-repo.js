import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class UserRepo {

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
    return await prisma.user.delete({
      where: { username }
    })
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

  async removeCompletedCourse(courseId) {
    return await prisma.completedCourse.delete({
      where: { username: courseId }
    })
  }

  async removeInProgressCourse(courseId) {
    return await prisma.inProgressCourse.delete({
      where: { username: courseId }
    })
  }

  async removePendingCourse(courseId) {
    return await prisma.pendingCourse.delete({
      where: { username: courseId }
    })
  }
}

export default new UserRepo()
