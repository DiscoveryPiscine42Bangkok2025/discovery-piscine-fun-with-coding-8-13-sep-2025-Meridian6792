document.addEventListener('DOMContentLoaded', () => {
    console.log('Modernized website loaded!');

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // set cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // get cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Apply theme on load
    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = 'Toggle Light Mode';
        }
    } else {
        // Default to light mode
        if (themeToggle) {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    }

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                setCookie('theme', 'dark', 7);
                themeToggle.textContent = 'Toggle Light Mode';
            } else {
                setCookie('theme', 'light', 7);
                themeToggle.textContent = 'Toggle Dark Mode';
            }
        });
    }
    // Tab switching
    const mainElement = document.querySelector('main');
    if (mainElement && mainElement.classList.contains('profile-container')) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate current tab
                document.querySelector('.tab-button.active')?.classList.remove('active');
                document.querySelector('.tab-content.active')?.classList.remove('active');

                // Activate new tab
                button.classList.add('active');
                const targetTab = button.dataset.tab;
                document.getElementById(`${targetTab}-content`).classList.add('active');
            });
        });
    }
});