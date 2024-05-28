$(() => {
  $("#filters i.fa").click(function (event) {
    $(this).toggleClass("fa-angle-up");
    $(this).toggleClass("fa-angle-down");
  });

  $("#rating-section input").on("click", function (event) {
    let checkedRadio = event.target;
    let radios = $("#rating-section input");

    for (let i = 0; i < radios.length; i++) {
      let radio = radios[i];
      let jqueryRadio = $("#" + radio.getAttribute("id"));

      if (radio == checkedRadio) {
        jqueryRadio.closest("div").addClass("my-primary-bg");
      } else {
        jqueryRadio.closest("div").removeClass("my-primary-bg");
      }
    }
  });
});
