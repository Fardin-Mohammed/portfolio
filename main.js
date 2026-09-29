const fetchData = async () => {
    try {
        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error(`Could not load data.json (${response.status})`);
        }

        const projectsData = await response.json();
        const section = document.querySelector(".secondPage");

        if (!section) {
            throw new Error('Could not find the ".secondPage" section.');
        }

        let projects = document.getElementById("projects");

        if (!projects) {
            projects = document.createElement("div");
            projects.id = "projects";
            projects.classList.add("projects");

            const heading = section.querySelector(".secondPage__upperText");
            heading ? heading.after(projects) : section.appendChild(projects);
        }

        projects.innerHTML = "";

        const firstRow = document.createElement("div");
        firstRow.classList.add("row1");

        const secondRow = document.createElement("div");
        secondRow.classList.add("row2");

        projects.append(firstRow, secondRow);

        projectsData.forEach((project, index) => {
            const article = document.createElement("article");
            article.classList.add("project");
            article.dataset.id = project.id;

            const card = document.createElement("div");
            card.classList.add("card-container");

            if (project.image) {
                const imageLink = document.createElement("a");
                imageLink.href = project.project_url || "#";
                imageLink.target = "_blank";
                imageLink.rel = "noopener noreferrer";

                const image = document.createElement("img");
                image.src = project.image;
                image.alt = project.title || "Project image";
                image.classList.add("card-image");

                imageLink.appendChild(image);
                card.appendChild(imageLink);
            }

            const textBox = document.createElement("div");
            textBox.classList.add("text-box");

            const topLine = document.createElement("div");
            topLine.classList.add("text-box-");

            const logoContainer = document.createElement("div");
            logoContainer.classList.add("text-box__left");

            if (project.svg) {
                if (project.svg.trim().startsWith("<svg")) {
                    logoContainer.innerHTML = project.svg;
                } else {
                    const logo = document.createElement("img");
                    logo.src = project.svg;
                    logo.alt = `${project.title || "Project"} logo`;
                    logoContainer.appendChild(logo);
                }
            }

            const dateContainer = document.createElement("div");
            dateContainer.classList.add("text-box__right");

            const date = document.createElement("p");
            date.textContent = project.date || "";
            dateContainer.appendChild(date);

            topLine.append(logoContainer, dateContainer);

            const text = document.createElement("div");
            text.classList.add("text-box__text");

            const title = document.createElement("h2");
            title.classList.add("text-box__text-h2");

            const titleLink = document.createElement("a");
            titleLink.textContent = project.title || "";
            titleLink.href = project.project_url || "#";
            titleLink.target = "_blank";
            titleLink.rel = "noopener noreferrer";
            title.appendChild(titleLink);

            const description = document.createElement("p");
            description.classList.add("text-box__text-p");
            description.textContent = project.description || "";

            text.append(title, description);
            textBox.append(topLine, text);
            article.append(card, textBox);

            (index < 2 ? firstRow : secondRow).appendChild(article);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
};

fetchData();