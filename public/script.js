document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav ul li a"); // Select all nav links

    // Toggle menu
    
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });


    // Close menu when clicking the close button
    closeMenu.addEventListener("click", () => {
        nav.classList.remove("active");
    });


    // Close menu when clicking a navigation link (on mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
            }
        });
    });


    // Close when clicking outside
    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove("active");
        }
    });
});


function toggleOverlay(element) {
    // Remove active class from all other items
    document.querySelectorAll(".work-item").forEach(item => {
      if (item !== element) {
        item.classList.remove("active");
      }
    });
  
    // Toggle active class on the clicked item
    element.classList.toggle("active");
  }
  
  // Close overlay when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".work-item")) {
      document.querySelectorAll(".work-item").forEach(item => {
        item.classList.remove("active");
      });
    }
  });
  