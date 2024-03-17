var postsHtml = `<div id="insert-post-id" class="card mt-5">
          <div class="card-header">
            <div class="row justify-content-between align-items-center">
              <div class="col-auto col-8">
                <h1 class="card-title fs-5 text-truncate">
                insert-post-title
                </h1>
              </div>
              <div class="col-auto rounded text-bg-primary">
                <h1 class="card-title fs-6 text-end m-0 py-2">User: insert-post-user</h1>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text">
              insert-post-body
            </div>
          </div>
          <div class="card-footer">
            <div class="row justify-content-between">
              <div class="col-12 col-sm-6 col-md-4">
                <button post-id="insert-post-id" user-id="insert-post-user" class="btn btn-secondary btn-update w-100">Edit</button>
              </div>
              <div class="col-12 mt-2 col-sm-6 mt-sm-0 col-md-4">
                <button post-id="insert-post-id" user-id="insert-post-user" class="btn btn-danger btn-delete w-100">Delete</button>
              </div>
            </div>
          </div>
        </div>`;

var storiesHtml = `<div id="insert-post-id" class="card mt-5">
          <div class="card-header">
            <div class="row justify-content-between align-items-center">
              <div class="col-auto col-10">
                <h1 class="card-title fs-5 text-truncate">
                insert-post-title
                </h1>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text">
              insert-post-body
            </div>
          </div>
          <div class="card-footer">
            <div class="row justify-content-between">
              <div class="col-12 col-sm-6 col-md-4">
                <button post-id="insert-post-id" class="btn btn-secondary btn-update w-100">Edit</button>
              </div>
              <div class="col-12 mt-2 col-sm-6 mt-sm-0 col-md-4">
                <button post-id="insert-post-id" class="btn btn-danger btn-delete w-100">Delete</button>
              </div>
            </div>
          </div>
        </div>`;

// var apiUrl = "https://jsonplaceholder.typicode.com/posts";
var apiUrl = "https://usmanlive.com/wp-json/api/stories/";

function clearInputFields() {
  $("input#post-title").val("");
  $("input#post-body").val("");
  $("#main-update-btn").attr("post-to-update", null);
}

function getPosts() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    success: function (response) {
      $("#posts-section").empty();

      for (let i = 0; i < response.length; i++) {
        // let userId = response[i]["userId"];
        let postId = response[i]["id"];
        let postTitle = response[i]["title"];
        let postBody = response[i]["content"];

        $("#posts-section").append(
          storiesHtml
            .replaceAll("insert-post-title", postTitle)
            .replaceAll("insert-post-body", postBody)
            // .replaceAll("insert-post-user", userId)
            .replaceAll("insert-post-id", postId)
        );
      }
    },
  });
}

function doBindings() {
  getPosts();

  $("#refresh-btn").click(function (event) {
    $.ajax({
      url: apiUrl + "refresh",
      method: "GET",
      success: function (event) {
        getPosts();
      },
    });
  });

  $("#main-create-btn").click(function (event) {
    event.preventDefault();
    let postTitle = $("input#post-title").val();
    let postBody = $("input#post-body").val();
    // let postId = 123;
    // let userId = 1;

    if (postTitle && postBody) {
      $("input#post-title").removeClass("is-invalid");
      $("input#post-body").removeClass("is-invalid");

      $("input#post-title").addClass("is-valid");
      $("input#post-body").addClass("is-valid");

      $.ajax({
        url: apiUrl,
        method: "POST",
        data: { title: postTitle, content: postBody },
        // { id: postId, userId: userId, title: postTitle, body: postBody },
        success: function (event) {
          getPosts();
          clearInputFields();
        },
      });
    } else {
      $("input#post-title").removeClass("is-valid");
      $("input#post-body").removeClass("is-valid");

      $("input#post-title").addClass("is-invalid");
      $("input#post-body").addClass("is-invalid");
    }
  });

  $("#main-update-btn").click(function (event) {
    event.preventDefault();

    let postTitle = $("input#post-title").val();
    let postBody = $("input#post-body").val();
    let postId = $("#main-update-btn").attr("post-to-update");
    // let userId = $("#main-update-btn").attr("user-id");

    $.ajax({
      url: apiUrl + postId,
      method: "PUT",
      data: { title: postTitle, content: postBody },
      // {
      //   id: postId,
      //   userId: userId,
      //   title: postTitle,
      //   body: postBody,
      // },
      success: function (response) {
        $("#main-update-btns").addClass("d-none");
        $("#main-create-btn").removeClass("d-none");
        clearInputFields();

        getPosts();
      },
    });
  });

  $("#main-clear-btn").click(function (event) {
    $("#main-update-btns").addClass("d-none");
    $("#main-create-btn").removeClass("d-none");

    clearInputFields();
  });

  $(document).on("click", ".btn-update", function (event) {
    let postId = $(this).attr("post-id");
    // let userId = $(this).attr("user-id");

    $.ajax({
      url: apiUrl + postId,
      method: "GET",
      success: function (response) {
        $("input#post-title").val(response.title);
        $("input#post-body").val(response.content);

        $("#main-update-btns").removeClass("d-none");
        $("#main-create-btn").addClass("d-none");
        $("#main-update-btn").attr("post-to-update", postId);
        // .attr("user-id", userId);
      },
    });
  });

  $(document).on("click", ".btn-delete", function (event) {
    let postId = $(this).attr("post-id");
    console.log(postId);
    $.ajax({
      url: apiUrl + postId,
      method: "DELETE",
      success: function (response) {
        getPosts();
      },
    });
  });
}

$(document).ready(doBindings);
