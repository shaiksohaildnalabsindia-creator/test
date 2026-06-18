// sidebar.js
function loadSidebar() {
    const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header" onclick="window.location.href='index.html'" tabindex="0" role="button">
        <div class="logo">
          <div class="logo-icon">📦</div>
          <div class="logo-text">Parcel Pro</div>
        </div>
        <div class="sidebar-subtitle">Delivery Management System</div>
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
              <span class="menu-item-badge">New</span>
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
            <a href="Record.html" class="menu-item" data-tooltip="Patients Record" data-page="Record.html">
              <span class="menu-item-icon">📋</span><span class="menu-item-text">Patients Records</span>
            </a>
          </div>
        </div>
      </div>

      <button class="collapse-expand" aria-label="Collapse/Expand sidebar" type="button" onclick="toggleCollapse()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M157.3 413.2c-6.6 0-13.1-2.5-18.2-7.5L7.5 274c-10-10-10-26.3 0-36.3L139.2 106c10-10 26.3-10 36.3 0s10 26.3 0 36.3L62 255.9l113.5 113.5c10 10 10 26.3 0 36.3-5 5-11.6 7.5-18.2 7.5"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M290.1 285H73.5c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7h216.7c14.2 0 25.7 11.5 25.7 25.7-.1 14.2-11.6 25.7-25.8 25.7m195.2 0h-94.4c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7h94.4c14.2 0 25.7 11.5 25.7 25.7S499.5 285 485.3 285m0 125.1H342c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7h143.3c14.2 0 25.7 11.5 25.7 25.7s-11.5 25.7-25.7 25.7m0-250.1H342c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7h143.3c14.2 0 25.7 11.5 25.7 25.7S499.5 160 485.3 160"></path>
        </svg>
      </button>
      <div class="sidebar-footer">
        <div>© 2024 Parcel Pro</div>
        <div style="font-size: 11px; opacity: 0.6; margin-top: 5px;">v${CONFIG.VERSION}</div>
      </div>
    </aside>`;

    // Inject into the page
    document.getElementById('sidebar-container').innerHTML = sidebarHTML;

    // Highlight the active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`.menu-item[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Global sidebar toggle functions
function toggleCollapse() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  if(!sidebar || !mainContent) return;

  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('sidebar-collapsed');
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if(sidebar) sidebar.classList.toggle('open');
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    
    // Apply saved collapse state
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (sidebar && mainContent && localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('sidebar-collapsed');
    }
});
