$(() => {
  $("#form-carousel").carousel();

  $("#form-carousel").on("slide.bs.carousel", (event) => {
    if (event.direction == "left") {
      $("form").addClass("was-validated");
      let activeCarouselItemId = $("#form-carousel .active").attr("id");
      if ($("#" + activeCarouselItemId + " input:invalid").length > 0) {
        event.preventDefault();
      } else {
        $("form").removeClass("was-validated");
      }
    }
  });

  $("#form-carousel").on("slid.bs.carousel", (event) => {
    let activeItemId = $("#form-carousel .carousel-item.active").attr("id");

    if (activeItemId == "first-carousel-item") {
      $("#carousel-prev-btn").addClass("d-none");

      $("#payment-stepper").removeClass("text-bg-primary");
      $("#payment-stepper").addClass("text-bg-secondary");
    } else {
      $("#carousel-prev-btn").removeClass("d-none");

      $("#payment-stepper").addClass("text-bg-primary");
      $("#payment-stepper").removeClass("text-bg-secondary");
    }

    if (activeItemId == "third-carousel-item") {
      $("#carousel-next-btn").addClass("d-none");
      $("#confirm-btn").removeClass("d-none");

      $("#finalize-stepper").addClass("text-bg-primary");
      $("#finalize-stepper").removeClass("text-bg-secondary");
    } else {
      $("#carousel-next-btn").removeClass("d-none");
      $("#confirm-btn").addClass("d-none");

      $("#finalize-stepper").removeClass("text-bg-primary");
      $("#finalize-stepper").addClass("text-bg-secondary");
    }

    if (activeItemId == "first-carousel-item") {
      $(".progress-bar").css("width", "0%");
    } else if (activeItemId == "second-carousel-item") {
      $(".progress-bar").css("width", "50%");
    } else {
      $(".progress-bar").css("width", "100%");
    }
  });
});
