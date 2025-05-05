import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class PrerequisiteRepo {

  // Get all prerequisites
  async getAllPrerequisites() {
    return await prisma.prerequisite.findMany({
      include: {
        course: true
      }
    })
  }

  // Get prerequisites for a specific course
  async getPrerequisitesByCourseId(courseId) {
    return await prisma.prerequisite.findMany({
      where: { course: { id: parseInt(courseId) } },
      include: {
        course: true
      }
    })
  }

  // Get a prerequisite by its ID
  async getPrerequisiteById(prerequisiteId) {
    return await prisma.prerequisite.findUnique({
      where: { userId: parseInt(prerequisiteId) },
      include: {
        course: true
      }
    })
  }

  // Create a new prerequisite
  async createPrerequisite(data) {
    return await prisma.prerequisite.create({ data })
  }

  // Update a prerequisite
  async updatePrerequisite(prerequisiteId, data) {
    return await prisma.prerequisite.update({
      where: { userId: parseInt(prerequisiteId) },
      data
    })
  }

  // Delete a prerequisite
  async deletePrerequisite(prerequisiteId) {
    return await prisma.prerequisite.delete({
      where: { userId: parseInt(prerequisiteId) }
    })
  }
}

export default new PrerequisiteRepo()
