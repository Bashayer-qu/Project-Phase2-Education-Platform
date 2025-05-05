import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class PrerequisiteRepo {

  async getAllPrerequisites() {
    return await prisma.prerequisite.findMany({
      include: {
        course: true
      }
    })
  }

  async getPrerequisitesByCourseId(courseId) {
    return await prisma.prerequisite.findMany({
      where: { course: { id: parseInt(courseId) } },
      include: {
        course: true
      }
    })
  }

  async getPrerequisiteById(prerequisiteId) {
    return await prisma.prerequisite.findUnique({
      where: { userId: parseInt(prerequisiteId) },
      include: {
        course: true
      }
    })
  }

  async createPrerequisite(data) {
    return await prisma.prerequisite.create({ data })
  }

  async updatePrerequisite(prerequisiteId, data) {
    return await prisma.prerequisite.update({
      where: { userId: parseInt(prerequisiteId) },
      data
    })
  }

  async deletePrerequisite(prerequisiteId) {
    return await prisma.prerequisite.delete({
      where: { userId: parseInt(prerequisiteId) }
    })
  }
}

export default new PrerequisiteRepo()
