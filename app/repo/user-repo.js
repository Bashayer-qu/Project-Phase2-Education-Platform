import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class UserRepo {

  // Get all users with their courses
  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        completedCourses: true,
        inProgressCourses: true,
        pendingCourses: true
      }
    })
  }

  // Get user by username
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

  // Create a new user
  async createUser(userData) {
    return await prisma.user.create({ data: userData })
  }

  // Update user info
  async updateUser(username, updatedData) {
    return await prisma.user.update({
      where: { username },
      data: updatedData
    })
  }

  // Delete a user
  async deleteUser(username) {
    return await prisma.user.delete({
      where: { username }
    })
  }

  // Add completed course to a user
  async addCompletedCourse(data) {
    return await prisma.completedCourse.create({ data })
  }

  // Add in-progress course to a user
  async addInProgressCourse(data) {
    return await prisma.inProgressCourse.create({ data })
  }

  // Add pending course to a user
  async addPendingCourse(data) {
    return await prisma.pendingCourse.create({ data })
  }

  // Remove a completed course
  async removeCompletedCourse(courseId) {
    return await prisma.completedCourse.delete({
      where: { username: courseId } // Adjust if using a different unique field
    })
  }

  // Remove an in-progress course
  async removeInProgressCourse(courseId) {
    return await prisma.inProgressCourse.delete({
      where: { username: courseId }
    })
  }

  // Remove a pending course
  async removePendingCourse(courseId) {
    return await prisma.pendingCourse.delete({
      where: { username: courseId }
    })
  }
}

export default new UserRepo()
