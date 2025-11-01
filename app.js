// Helper function for making sidebar that appears on project pages
function populateSidebar(sidebar) {
    const allProjects = [
        { name: "SEVT",     url: "sevt.html" },
        { name: "Wall-E",     url: "walle.html" }
    ];

    const allWork = [
        { name: "SpaceX - Graduate Engineering Intern",         url: "spacex-work.html" },
        { name: "Disney (Emerging Tech Team) - Software Engineering Intern",       url: "disney-work.html" }
    ];

    const currentPage = window.location.pathname.split('/').pop();
    const currentPath = window.location.pathname;

    let projectPath = '../projects/';
    let workPath = '../work/';
    
    if (currentPath.includes('/projects/')) {
        projectPath = ''; 
    } else if (currentPath.includes('/work/')) {
        workPath = ''; 
    }

    let sidebarHTML = '';

    // Project list
    sidebarHTML += '<h3>Projects</h3><ul>';
    allProjects.forEach(project => {
        const url = projectPath + project.url;
        const isActive = (project.url === currentPage) ? 'active' : '';
        sidebarHTML += `<li><a href="${url}" class="${isActive}">${project.name}</a></li>`;
    });
    sidebarHTML += '</ul>';

    // Work & Research list
    sidebarHTML += '<h3>Work & Research</h3><ul>';
    allWork.forEach(work => {
        const url = workPath + work.url;
        const isActive = (work.url === currentPage) ? 'active' : '';
        sidebarHTML += `<li><a href="${url}" class="${isActive}">${work.name}</a></li>`;
    });
    sidebarHTML += '</ul>';

    sidebar.innerHTML = sidebarHTML;
}


// set up page
document.addEventListener('DOMContentLoaded', () => {

    // load sidebar
    const layout = document.querySelector('.project-detail-layout');
    if (layout) {
        const sidebarElement = document.createElement('aside');
        sidebarElement.className = 'sidebar';
        sidebarElement.id = 'shared-sidebar';
        
        layout.prepend(sidebarElement);
        
        populateSidebar(sidebarElement);
    }

    // load top nav bar
    const navPlaceholder = document.getElementById("main-nav-placeholder");
    if (navPlaceholder) {
        const pathDepth = navPlaceholder.getAttribute("data-path-depth") || "";

        fetch(pathDepth + "top-nav-bar.html")
            .then(response => {
                if (!response.ok) throw new Error("Error: Could not load nav bar :(");
                return response.text();
            })
            .then(html => {
                navPlaceholder.innerHTML = html;
                const currentPath = window.location.pathname;
                const navLinks = navPlaceholder.querySelectorAll(".main-nav a");
                
                navLinks.forEach(link => {
                    let linkPath = link.getAttribute("href");
                    link.href = pathDepth + linkPath; 

                    if (link.href.endsWith(currentPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
                        link.classList.add("active");
                    }
                });
            })
            .catch(err => {
                console.error(err);
                navPlaceholder.innerHTML = "<p>Error: Could not load nav bar :(</p>";
            });
    }
});