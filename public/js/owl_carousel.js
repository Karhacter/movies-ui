$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: true,
  autoplay: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    760: {
      items: 2,
    },
    1024: {
      items: 3,
    },
    1400: {
      items: 4,
      loop: false,
    },
  },
})
