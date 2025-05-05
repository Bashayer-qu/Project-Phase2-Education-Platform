import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class ScheduleRepo {

  async getAllSchedules() {
    return await prisma.schedule.findMany({
      include: {
        course: true
      }
    })
  }

  async getSchedulesByCourseId(courseId) {
    return await prisma.schedule.findMany({
      where: { course: { id: parseInt(courseId) } },
      include: {
        course: true
      }
    })
  }

  async getScheduleById(scheduleId) {
    return await prisma.schedule.findUnique({
      where: { userId: parseInt(scheduleId) },
      include: {
        course: true
      }
    })
  }

  async createSchedule(data) {
    return await prisma.schedule.create({ data })
  }

  async updateSchedule(scheduleId, data) {
    return await prisma.schedule.update({
      where: { userId: parseInt(scheduleId) },
      data
    })
  }

  async deleteSchedule(scheduleId) {
    return await prisma.schedule.delete({
      where: { userId: parseInt(scheduleId) }
    })
  }
}

export default new ScheduleRepo()
