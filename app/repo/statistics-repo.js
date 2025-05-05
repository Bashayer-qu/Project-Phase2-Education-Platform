document.addEventListener("DOMContentLoaded", async () => {
  const rolesContainer = document.getElementById("userRolesContainer");
  const topCoursesContainer = document.getElementById("topCoursesContainer");
  const failingContainer = document.getElementById("failingStudentsContainer");

  try {
    const response = await fetch("../app/api/statistics/route.js");
    if (!response.ok) throw new Error("Failed to fetch statistics");

    const data = await response.json();

    rolesContainer.innerHTML = "";
    for (const role in data.userRoles) {
      const p = document.createElement("p");
      p.textContent = `${role}: ${data.userRoles[role]}`;
      rolesContainer.appendChild(p);
    }

    topCoursesContainer.innerHTML = "";
    data.topCourses.forEach(course => {
      const p = document.createElement("p");
      p.textContent = course;
      topCoursesContainer.appendChild(p);
    });

    failingContainer.textContent = `Total failing students: ${data.failingStudents}`;

  } catch (error) {
    console.error("Failed to load statistics:", error);
  }
});
