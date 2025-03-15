<template>
  <li class="nav-item">
    <a
      class="nav-link active s"
      aria-current="page"
      href="home"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Home</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link"
      href="movies"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Movies</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link"
      href="web-series"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Web Series</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link"
      href="kids"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Kids</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link"
      href="tv"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >TV</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link"
      href="tokens-purchase"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Tokens</a
    >
  </li>

  <li class="nav-item">
    <a
      class="nav-link"
      href="contact"
      onMouseOver="this.style.color='red'"
      onMouseOut="this.style.color='white'"
      >Contact Us</a
    >
  </li>

  <li>
    <!-- Genre dropdown starts-->
    <div>
      <div
        class="dropdown"
        style="position: relative; display: inline-block; padding-top: 5px; padding-left: 15px"
      >
        <button
          class="btn btn-outline-danger dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          style="font-size: 20px"
        >
          Genres
        </button>
        <div class="dropdown-content" style="color: white">
          <a href="popular">Popular</a>
          <a href="crime">Crime</a>
          <a href="suspense">Suspense & Thriller</a>
          <a href="action">Action</a>
          <a href="fantasy">Sci-Fi & Fantasy</a>
          <a href="documentary">Documentary</a>
          <a href="horror">Horror</a>
          <a href="drama">Drama</a>
          <a href="war">War & Politics</a>
          <a href="comedy">Comedy</a>
          <a href="romance">Romance</a>
          <a href="anime">Anime</a>
        </div>
      </div>
    </div>
    <!-- Genre dropdown ends-->
  </li>
  <div style="position: relative; display: inline-block; padding-top: 5px; padding-left: 15px">
    <li>
      <button
        type="button"
        class="btn btn-light"
        onclick="logout()"
        onMouseOver="this.style.color='red'"
        onMouseOut="this.style.color='white'"
      >
        Logout
      </button>
    </li>
  </div>
</template>

<style scoped>
#scrollToTopButton {
  position: fixed;
  bottom: 40px;
  right: 25px;
  font-size: 25px;
  z-index: 99;
  width: 50px;
  height: 50px;
  background-color: red;
  color: black;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 6px;
  border-radius: 50%;
}
#scrollToTopButton:hover,
i:hover {
  background-color: white;
  color: red;
}
#nav:hover {
  background-color: #e60e23 !important;
}

.logo {
  width: 110px;
  height: 90px;
  padding: 3px;
  margin: 0;
  padding: 0;
}
.fas:hover {
  background: none !important ;
}
.nav-item {
  flex-wrap: wrap;
}
.menu li a:hover {
  color: red !important;
  opacity: 0.5;
}
</style>
