<template>
  <aside class="main-sidebar sidebar-dark-primary custome-sidebar">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="../../assets/img/admin/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">Admin Manager</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="../../assets/img/admin/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">Hi, Karhacter</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item has-treeview menu-open">
            <a href="/admin/search" class="nav-link active">
              <i class="nav-icon fas fa-search"></i>
              <p>Search</p>
            </a>
          </li>
          <li class="nav-item has-treeview menu-open">
            <router-link to="/admin" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Movie
                <span class="right badge badge-danger">New</span>
              </p>
            </a>
          </li>

          <!-- Movie TreeView -->
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Movie CRUD
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/movies/create" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create Movie</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/movies/" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Movie</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/movies/trash" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Trash Movie</p>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- User TreeView -->
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                User CRUD
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/user/create" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create User</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/user/" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List User</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/user/trash" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Trash User</p>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- Comment TreeView -->
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Comments CRUD
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/comment/" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Comments</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/comment/list" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Search Movie Comments</p>
                </router-link>
              </li>
            </ul>
          </li>
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
          >
            <li class="nav-item">
              <router-link to="/admin/payment" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>Payment Management</p>
              </router-link>
            </li>
          </ul>
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
          >
            <li class="nav-item">
              <router-link to="/admin/episode" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>Episode Management</p>
              </router-link>
            </li>
          </ul>
          <li class="nav-header">EXTENSIONS</li>
          <li class="nav-item">
            <router-link to="/admin/calendar" class="nav-link">
              <i class="nav-icon fas fa-calendar-alt"></i>
              <p>
                Calendar
                <span class="badge badge-info right">2</span>
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="pages/gallery.html" class="nav-link">
              <i class="nav-icon far fa-image"></i>
              <p>Gallery</p>
            </a>
          </li>

          <li class="nav-header">LABELS</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-circle text-danger"></i>
              <p>Important</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-circle text-warning"></i>
              <p>Warning</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-circle text-info"></i>
              <p>Informational</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style scoped>
@import '@/assets/css/adminlte.css';
</style>
