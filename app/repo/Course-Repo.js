import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class CourseRepo {

  // Get all courses
  async getAllCourses() {
    return await prisma.course.findMany({
      include: {
        schedule: true,
        prerequisites: true
      }
    })
  }

  // Get course by ID
  async getCourseById(courseId) {
    return await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      include: {
        schedule: true,
        prerequisites: true
      }
    })
  }

  // Create a new course
  async createCourse(courseData) {
    return await prisma.course.create({ data: courseData })
  }

  // Update an existing course
  async updateCourse(courseId, updatedData) {
    return await prisma.course.update({
      where: { id: parseInt(courseId) },
      data: updatedData
    })
  }

  // Delete a course
  async deleteCourse(courseId) {
    return await prisma.course.delete({
      where: { id: parseInt(courseId) }
    })
  }

  // Get all users
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
    return await prisma.user.delete({ where: { username } })
  }

  // Add completed course to user
  async addCompletedCourse(data) {
    return await prisma.completedCourse.create({ data })
  }

  // Add in-progress course to user
  async addInProgressCourse(data) {
    return await prisma.inProgressCourse.create({ data })
  }

  // Add pending course to user
  async addPendingCourse(data) {
    return await prisma.pendingCourse.create({ data })
  }
}

export default new CourseRepo()
