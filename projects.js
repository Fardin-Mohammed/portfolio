const list = document.querySelector("#projects-list");

fetch("./projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("projects.json kon niet worden geladen");
        }

        return response.json();
    })
    .then(projects => {
        projects.forEach(project => list.append(createProject(project)));
    })
    .catch(error => console.error("Fout bij laden van projecten:", error));

function createProject(project) {
    const article = document.createElement("article");
    article.className = "project";

    const left = document.createElement("div");
    left.className = "project__left";

    const projectLink = document.createElement("a");
    projectLink.href = project.project_url;

    // Het veld video wordt altijd als video gebruikt.
    const video = document.createElement("video");
    video.src = project.video;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    projectLink.append(video);
    left.append(projectLink);

    const right = document.createElement("div");
    right.className = "project__right";

    const head = document.createElement("div");
    head.className = "project__right--head";

    const headWrapper = document.createElement("div");
    headWrapper.className = "project__right--head-wrapper";

    const logoLink = document.createElement("a");
    logoLink.href = project.project_url;

    // Accepteert een afbeeldingspad uit img (of het oude veld svg).
    // Inline-SVG-tekst wordt niet gebruikt.
    const logoPath = project.img || project.svg || "";

    if (logoPath && !logoPath.trim().startsWith("<svg")) {
        const logo = document.createElement("img");
        logo.src = logoPath;
        logo.alt = `${project.title} logo`;
        logo.className = "project__right--image";
        logoLink.append(logo);
    }

    headWrapper.append(logoLink);

    const programmer = document.createElement("p");
    programmer.textContent = project.programmer || "";
    headWrapper.append(programmer);

    const date = document.createElement("p");
    date.textContent = project.date || "";

    head.append(headWrapper, date);

    const details = document.createElement("div");
    details.className = "project__right--details";

    const title = document.createElement("h2");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const buttonLink = document.createElement("a");
    buttonLink.href = project.project_url;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "View Project";
    buttonLink.append(button);

    details.append(title, description, buttonLink);
    right.append(head, details);
    article.append(left, right);

    return article;
}