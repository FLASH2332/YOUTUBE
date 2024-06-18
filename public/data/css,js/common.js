const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.side-bar');
const linkTexts = document.querySelectorAll('.link-text');
const linkers = document.getElementsByClassName("links");
const cover = document.getElementById('cover');
var temp = window.innerWidth > 800 ? false : true;


sidebar.classList.toggle('show');
var clicked = false;


const navbarThemeCheckbox = document.getElementById("navbar-theme");
const sidebarThemeCheckbox = document.getElementById("insidebar-theme");


// // Function to apply the theme based on stored preference
// function applyStoredTheme() {
//     const storedTheme = theme;
//     if (storedTheme === 'dark') {
//         applyTheme('dark');
//         navbarThemeCheckbox.checked = true; // Update the checkbox state
//     } else {
//         applyTheme('light');
//         navbarThemeCheckbox.checked = false; // Update the checkbox state
//     }
// }

// // Call applyStoredTheme when the page loads
// window.addEventListener('load', applyStoredTheme);

function applyTheme(theme) {
    const body = document.body;
    if (theme === "dark") {
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
    }
}
const currentPath = window.location.pathname
const currentUserId = currentPath.split('/').at(2)
async function loadTheme() {
    let themeresponse
    try {
        const response = await fetch('/youtube-clone/fetch/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId })
        })
        themeresponse = await response.json();
        // console.log(themeresponse.theme);
    } catch (err) {
        console.log(err);
    }
    console.log(themeresponse.theme);
    applyTheme(themeresponse.theme);
    navbarThemeCheckbox.checked = themeresponse.theme == 'dark'
}

loadTheme()

if (window.innerWidth < 800) {
    sidebar.classList.remove('show');
    linkTexts.forEach(linkText => {
        linkText.classList.remove('show-text');
    });
    cover.classList.remove('show');
}

async function syncCheckboxes(sourceCheckbox, targetCheckbox) {
    targetCheckbox.checked = sourceCheckbox.checked;
    applyTheme(sourceCheckbox.checked ? "dark" : "light");
    try {
        const response = await fetch('/youtube-clone/put/theme', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId, theme: sourceCheckbox.checked ? "dark" : "light" })
        })
    } catch (err) {
        console.log(err);
    }
}


navbarThemeCheckbox.addEventListener("change", function () {
    syncCheckboxes(navbarThemeCheckbox, sidebarThemeCheckbox);
});

sidebarThemeCheckbox.addEventListener("change", function () {
    syncCheckboxes(sidebarThemeCheckbox, navbarThemeCheckbox);
});

toggleBtn.addEventListener('click', () => {
    clicked = true;
    linkTexts.forEach(linkText => {
        linkText.classList.toggle('show-text');
    });
    cover.classList.toggle('show');
    if (window.innerWidth < 800) {
        sidebar.classList.toggle('show');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 800 && !temp) {
        sidebar.classList.remove('show');
        linkTexts.forEach(linkText => {
            linkText.classList.remove('show-text');
        });
        cover.classList.remove('show');
        temp = true;

    } else if (window.innerWidth >= 800 && temp) {
        sidebar.classList.add('show');
        temp = false;
    }
});

cover.addEventListener('click', () => {
    if (clicked == true) {
        cover.classList.toggle('show');
        linkTexts.forEach(linkText => {
            linkText.classList.toggle('show-text');
        });
        clicked = false;
    }
    if (window.innerWidth < 800) {
        sidebar.classList.toggle('show');
    }
});