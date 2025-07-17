export function initializeNavbar(navbar) {
  navbar.className = 'fixed top-0 left-0 right-0 z-50 bg-white shadow-soft py-2';
  navbar.innerHTML = `
    <div class="container mx-auto px-4 flex justify-between items-center">
      <a href="/" class="flex items-center gap-2">
        <i data-lucide="map-pin" class="h-8 w-8 text-primary-500"></i>
        <span class="text-2xl font-bold text-gray-900">Food<span class="text-primary-500">Khoj</span></span>
      </a>

      <div class="hidden md:flex items-center space-x-6">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/services" class="nav-link">Services</a>
        <a href="/blog" class="nav-link">Blog</a>
        <a href="/track" class="btn btn-primary">Track Order</a>
      </div>

      <button class="md:hidden menu-button">
        <i data-lucide="menu" class="h-6 w-6"></i>
      </button>
    </div>

    <div class="mobile-menu hidden md:hidden">
      <div class="container mx-auto px-4 py-4">
        <a href="/" class="block py-2">Home</a>
        <a href="/about" class="block py-2">About</a>
        <a href="/services" class="block py-2">Services</a>
        <a href="/blog" class="block py-2">Blog</a>
        <a href="/track" class="btn btn-primary w-full mt-4">Track Order</a>
      </div>
    </div>
  `;

  const menuButton = navbar.querySelector('.menu-button');
  const mobileMenu = navbar.querySelector('.mobile-menu');

  menuButton?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });

  const updateActiveLink = () => {
    const links = navbar.querySelectorAll('a');
    links.forEach(link => {
      if (link.pathname === window.location.pathname) {
        link.classList.add('text-primary-500');
      } else {
        link.classList.remove('text-primary-500');
      }
    });
  };

  updateActiveLink();
  window.addEventListener('popstate', updateActiveLink);
}