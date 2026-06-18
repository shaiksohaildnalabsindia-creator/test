// ==========================================================================
// MASTER SIDEBAR.JS - PARCEL PRO
// Handles Mobile menus, PC collapsing, and active page highlighting
// ==========================================================================

function loadSidebar() {
    const sidebarHTML = `
    <div class="sidebar-header" onclick="window.location.href='index.html'" tabindex="0" role="button">
      <div class="logo">
        <div class="logo-icon">📦</div>
        <div class="logo-text">Parcel Pro</div>
      </div>
      <div class="sidebar-subtitle">Delivery Management</div>
    </div>

    <div class="sidebar-menu">
      <div class="menu-section">
        <div class="menu-section-title">Operations</div>
        <div class="menu-items">
          <a href="parcel_entry.html" class="menu-item" data-page="parcel_entry.html">
            <span class="menu-item-icon">📦</span><span class="menu-item-text">Parcel Entry</span>
          </a>
          <a href="parcel_entry_form.html" class="menu-item" data-page="parcel_entry_form.html">
            <span class="menu-item-icon">🔍</span><span class="menu-item-text">Parcel Scanner</span>
          </a>
          <a href="upload_sample_images.html" class="menu-item" data-page="upload_sample_images.html">
            <span class="menu-item-icon">📷</span><span class="menu-item-text">Upload Images</span>
          </a>
        </div>
      </div>

      <div class="menu-section">
        <div class="menu-section-title">Reports</div>
        <div class="menu-items">
          <a href="delivered_today.html" class="menu-item" data-page="delivered_today.html">
            <span class="menu-item-icon">📅</span><span class="menu-item-text">Delivered Today</span>
          </a>
          <a href="total.html" class="menu-item" data-page="total.html">
            <span class="menu-item-icon">📊</span><span class="menu-item-text">Total Samples</span>
          </a>
          <a href="gallery.html" class="menu-item" data-page="gallery.html">
            <span class="menu-item-icon">🖼️</span><span class="menu-item-text">Sample Gallery</span>
          </a>
          <a href="Record.html" class="menu-item" data-page="Record.html">
            <span class="menu-item-icon">📋</span><span class="menu-item-text">Patients Records</span>
          </a>
        </div>
      </div>
    </div>

    <button class="collapse-expand" aria-label="Collapse sidebar" type="button" onclick="toggleCollapse()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
         <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
      </svg>
    </button>
    `;

    // Inject into the page
    const container = document.getElementById('sidebar-container');
    if(container) {
        // Create the aside element dynamically
        const aside = document.createElement('aside');
        aside.className = 'sidebar';
        aside.id = 'sidebar';
        aside.innerHTML = sidebarHTML;
        container.replaceWith(aside);
    }

    // Highlight the active page automatically based on the URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`.menu-item[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ---------- RESPONSIVE TOGGLES ---------- //

// 1. For PC: Collapse the sidebar to show icons only
function toggleCollapse() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  if(!sidebar || !mainContent) return;

  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('sidebar-collapsed');
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

// 2. For Mobile: Slide the sidebar in and out
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if(sidebar) sidebar.classList.toggle('open');
}

// ---------- INITIALIZATION ---------- //

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the HTML
    loadSidebar();
    
    // 2. Apply saved PC collapse state
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (sidebar && mainContent && window.innerWidth > 768) {
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        }
    }

    // 3. Mobile safety: Close sidebar if user clicks outside of it
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            // If the click was NOT on the sidebar and NOT on the menu button
            if (!sidebar.contains(e.target) && !e.target.closest('.menu-btn')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // 4. Handle resizing window from Mobile to PC
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('open'); // Reset mobile state
        }
    });
});
