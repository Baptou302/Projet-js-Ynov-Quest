function renderCourse(course) {
    return `
        <div class="card stack">
            <h3>${course.title}</h3>
            <ul>
                ${course.points.map(point => `<li>${point}</li>`).join("")}
            </ul>
        </div>
    `;
}

export default renderCourse;