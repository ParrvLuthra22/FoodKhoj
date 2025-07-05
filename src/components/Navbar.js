export function initializeNavbar() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  let isMenuOpen = false;
  let isScrolled = false;

  // Update navbar on scroll
  window.addEventListener('scroll', () => {
    isScrolled = window.scrollY > 10;
    updateNavbarStyle();
  });

  // Toggle mobile menu
  const menuButton = navbar.querySelector('.menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      updateMobileMenu();
    });
  }

  function updateNavbarStyle() {
    navbar.className = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'
    }`;
  }

  function updateMobileMenu() {
    const mobileMenu = navbar.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.className = `md:hidden ${isMenuOpen ? 'block' : 'hidden'}`;
    }
  }
}