$(() => {
  $("#contact-form input[type=Submit]").on("click", (event) => {
    $("#contact-form .form-floating input").each(function (idx, elem) {
      if ($(this).val()) {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");

        event.preventDefault();
      }
    });
  });
});
