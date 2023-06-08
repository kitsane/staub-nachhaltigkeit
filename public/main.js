document.addEventListener("DOMContentLoaded", function () {
  const navButton = document.querySelector(".navigation-button");

  if (navButton === null) return;

  const toggleNavMenu = () => {
    let navMenu = document.querySelector(".navigation-menu");
    let body = document.querySelector("body");

    if (navMenu === null || body === null) return;

    if (navMenu.classList.contains("navigation-menu-visible")) {
      navMenu.classList.remove("navigation-menu-visible");
      body.classList.remove("scroll-disabled");
    } else {
      navMenu.classList.add("navigation-menu-visible");
      body.classList.add("scroll-disabled");
    }
  };

  navButton.addEventListener("click", toggleNavMenu);
});
