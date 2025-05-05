document.addEventListener("DOMContentLoaded", async () => {
  const rolesContainer = document.getElementById("userRolesContainer");
  const topCoursesContainer = document.getElementById("topCoursesContainer");
  const failingContainer = document.getElementById("failingStudentsContainer");

  try {
    const response = await fetch("../app/data/mock-statistics.json");
    if (!response.ok) throw new Error("Failed to fetch mock statistics");

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

    console.log("Mock statistics loaded successfully:", data);
  } catch (error) {
    console.error("Failed to load mock statistics:", error);
  }
});
