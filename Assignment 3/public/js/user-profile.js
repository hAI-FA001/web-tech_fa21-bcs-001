$(() => {
  $("div#my-profile-info form input").on("input", (event) => {
    let whatUserTyped = event.target.value;
    let typeOfInput = event.target.getAttribute("type");
    let originalValue = "";

    if (typeOfInput == "text") {
      originalValue = user.name; //"<%= user.name %>";
    } else if (typeOfInput == "email") {
      originalValue = user.email; //"<%= user.email %>";
    }

    if (
      whatUserTyped &&
      whatUserTyped.trim() &&
      whatUserTyped != originalValue
    ) {
      $("form input.btn").removeClass("disabled");
      $("form a.btn-danger").removeClass("d-none");
    } else {
      $("form input.btn").addClass("disabled");
      $("form a.btn-danger").addClass("d-none");
    }
  });
});
