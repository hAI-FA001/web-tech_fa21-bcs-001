var api_url = "https://usmanlive.com/wp-json/api/stories/";

function loadStories() {
  $.ajax({
    url: api_url,
    method: "GET",
    success: function (response) {
      $("#stories").empty();

      for (var i = 0; i < response.length; i++) {
        var story_html = `<div class="col-12 col-md-6 col-lg-4">
      <div class="card shadow-sm" id="${response[i].id}">
        <div class="card-header">
        <h1 class="fs-4 d-inline-block col-8 text-truncate">${response[i].title}</h1>
      </div>
      <div class="card-body">
        <div class="card-text">${response[i].content}</div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col text-end">
            <button class="btn btn-secondary w-75 btn-edit">Edit</button>
          </div>
          <div class="col text-start">
            <button class="btn btn-danger w-75 btn-delete">Delete</button>
          </div>
        </div>
      </div>
      </div>
      </div>`;

        $("#stories").append(story_html);
      }
    },
  });
}

function validateInputs() {
  let story_name = $("#story-form input[name=story-name]");
  let story_desc = $("#story-form input[name=story-desc]");

  let all_valid = true;

  if (!story_name.val()) {
    story_name.removeClass("is-valid");
    story_name.addClass("is-invalid");
    all_valid = false;
  } else {
    story_name.removeClass("is-invalid");
    story_name.addClass("is-valid");
  }

  if (!story_desc.val()) {
    story_desc.removeClass("is-valid");
    story_desc.addClass("is-invalid");
    all_valid = false;
  } else {
    story_desc.removeClass("is-invalid");
    story_desc.addClass("is-valid");
  }

  return all_valid;
}

function resetForm() {
  $("#story-form input[type=text]").val("");
  $("#story-form .is-valid").removeClass("is-valid");
  $("#story-form").attr("story-id", null);
  $("#edit-btns").addClass("d-none");
  $("#create-story-btn").removeClass("d-none");
}

function handleCreateBtn(event) {
  event.preventDefault();

  let story_name = $("#story-form input[name=story-name]").val();
  let story_desc = $("#story-form input[name=story-desc]").val();

  let all_valid = validateInputs();

  if (all_valid) {
    $.ajax({
      url: api_url,
      method: "POST",
      data: { title: story_name, content: story_desc },
      success: function (response) {
        resetForm();
        loadStories();
      },
    });
  }
}

function handleUpdateBtn(event) {
  event.preventDefault();

  let story_id = $("#story-form").attr("story-id");
  let story_name = $("#story-form input[name=story-name]").val();
  let story_desc = $("#story-form input[name=story-desc]").val();

  let all_valid = validateInputs();

  if (all_valid) {
    $.ajax({
      url: api_url + story_id,
      method: "PUT",
      data: { title: story_name, content: story_desc },
      success: function (response) {
        resetForm();
        loadStories();
      },
    });
  }
}

function handleEditBtn(event) {
  let parent_card = $(this).closest("div.card");

  let story_id = parent_card.attr("id");
  let story_title = parent_card.find("h1").text();
  let story_body = parent_card.find(".card-text").text();

  $("#story-form").attr("story-id", story_id);
  $("#story-form input[name=story-name]").val(story_title).focus();
  $("#story-form input[name=story-desc]").val(story_body).focus();

  $("#edit-btns").removeClass("d-none");
  $("#create-story-btn").addClass("d-none");
}

function handleDeleteBtn(event) {
  let story_id = $(this).closest("div.card").attr("id");

  $.ajax({
    url: api_url + story_id,
    method: "DELETE",
    success: function (response) {
      loadStories();
    },
  });
}

function doBindings() {
  $("#create-story-btn").click(handleCreateBtn);
  $("#update-story-btn").click(handleUpdateBtn);
  $("#cancel-btn").click(resetForm);
  $(document).on("click", ".btn-edit", handleEditBtn);
  $(document).on("click", ".btn-delete", handleDeleteBtn);

  loadStories();
}

$(document).ready(doBindings);
