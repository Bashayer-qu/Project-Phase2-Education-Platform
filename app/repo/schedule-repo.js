import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class ScheduleRepo {

  // Get all schedules
  async getAllSchedules() {
    return await prisma.schedule.findMany({
      include: {
        course: true
      }
    })
  }

  // Get schedules for a specific course
  async getSchedulesByCourseId(courseId) {
    return await prisma.schedule.findMany({
      where: { course: { id: parseInt(courseId) } },
      include: {
        course: true
      }
    })
  }

  // Get schedule by ID
  async getScheduleById(scheduleId) {
    return await prisma.schedule.findUnique({
      where: { userId: parseInt(scheduleId) },
      include: {
        course: true
      }
    })
  }

  // Create a new schedule
  async createSchedule(data) {
    return await prisma.schedule.create({ data })
  }

  // Update a schedule
  async updateSchedule(scheduleId, data) {
    return await prisma.schedule.update({
      where: { userId: parseInt(scheduleId) },
      data
    })
  }

  // Delete a schedule
  async deleteSchedule(scheduleId) {
    return await prisma.schedule.delete({
      where: { userId: parseInt(scheduleId) }
    })
  }
}

export default new ScheduleRepo()
