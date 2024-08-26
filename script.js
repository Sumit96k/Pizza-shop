// Dark Mode Toggle
const darkModeButton = document.getElementById('darkmode');
const body = document.body;

darkModeButton.addEventListener('click', () => {
    body.classList.toggle('active');
    if (body.classList.contains('active')) {
        darkModeButton.innerHTML = '<i class="bx bx-sun"></i>';
    } else {
        darkModeButton.innerHTML = '<i class="bx bx-moon"></i>';
    }
});

// Navbar Toggle for Mobile
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.textContent = 'Top';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Basic Search Functionality

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the search button and input elements
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // Add an event listener to the search button
    searchBtn.addEventListener('click', function() {
        // Get the value from the search input
        const query = searchInput.value.trim().toLowerCase();

        // If the search input is empty, do nothing
        if (query === '') {
            return;
        }

        // Basic search implementation
        // Here we search through the section titles (h2) on the page
        const sections = document.querySelectorAll('section');
        let found = false;

        sections.forEach(section => {
            const title = section.querySelector('h2');
            if (title && title.textContent.toLowerCase().includes(query)) {
                // Scroll to the matching section
                section.scrollIntoView({ behavior: 'smooth' });
                found = true;
            }
        });

        // If no match is found, alert the user (optional)
        if (!found) {
            alert('No matching sections found!');
        }
    });
});

// Get modal elements
var loginModal = document.getElementById("loginModal");
var signupModal = document.getElementById("signupModal");

// Get open modal buttons
var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");

// Get close buttons
var loginClose = document.getElementById("loginClose");
var signupClose = document.getElementById("signupClose");

// Open login modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Open sign-up modal
signupBtn.onclick = function() {
    signupModal.style.display = "block";
}

// Close modals
loginClose.onclick = function() {
    loginModal.style.display = "none";
}
signupClose.onclick = function() {
    signupModal.style.display = "none";
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
}
