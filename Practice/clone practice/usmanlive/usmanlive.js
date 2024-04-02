function doBindings() {
  $(window).scroll(function (event) {
    if ($(this).scrollTop() > 50 && $("#sticky-nav").hasClass("d-lg-none")) {
      $("#sticky-nav")
        .removeClass("d-lg-none")
        .removeClass("mt-5")
        .addClass("d-lg-block")
        .slideDown(500);
    } else if (
      $(this).scrollTop() <= 40 &&
      $("#sticky-nav").hasClass("d-lg-block")
    ) {
      $("#sticky-nav")
        .addClass("mt-5")
        .fadeOut("slow", function () {
          $(this).addClass("d-lg-none");
        });
    }
  });
}
$("document").ready(doBindings);
