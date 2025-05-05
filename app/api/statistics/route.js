import StatisticsRepo from '@/repo/statistics-repo';

export async function GET() {
  const roles = await StatisticsRepo.getUserCountByRole();
  const topCourses = await StatisticsRepo.getTop3CoursesByEnrollment();
  const failingCount = await StatisticsRepo.getFailingStudentsCount();

  return Response.json({
    userRoles: roles,
    topCourses,
    failingStudents: failingCount
  });
}
