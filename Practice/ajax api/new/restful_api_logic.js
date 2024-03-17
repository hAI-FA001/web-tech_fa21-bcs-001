var product_html = `<div class="card col-12 col-md-6 col-lg-4">
<div class="card-header">
  <h1 class="fs-4 d-inline-block col-8 text-truncate">Title</h1>
  <p class="fs-4 d-inline-block text-end fs-5">$</p>
</div>
<div class="card-body">
  <div class="card-text">description</div>
</div>
<div class="card-footer">
  <div class="row">
    <div class="col">
      <p class="badge rounded-pill text-bg-light py-2 px-3">
        category
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col text-end">
      <button class="btn btn-secondary w-75 btn-edit">Edit</button>
    </div>
    <div class="col text-start">
      <button class="btn btn-danger w-75 btn-delete">Delete</button>
    </div>
  </div>
</div>
</div>`;

var api_url = "https://fakestoreapi.com/products";

function handleCreateBtn(event) {
  let product_name = $("#product-form input[name=product-name]");
  let product_price = $("#product-form input[type=Number]");
  let product_category = $("#select-category");
  let product_desc = $("#product-form input[name=product-desc]");

  console.log(
    product_name.val(),
    product_price.val(),
    product_category.val(),
    product_desc.val()
  );

  let all_valid = true;

  if (!product_name.val()) {
    product_name.removeClass("is-valid");
    product_name.addClass("is-invalid");
    all_valid = false;
  } else {
    product_name.removeClass("is-invalid");
    product_name.addClass("is-valid");
  }

  if (!product_price.val()) {
    product_price.removeClass("is-valid");
    product_price.addClass("is-invalid");
    all_valid = false;
  } else {
    product_price.removeClass("is-invalid");
    product_price.addClass("is-valid");
  }

  if (!product_category.val()) {
    product_category.removeClass("is-valid");
    product_category.addClass("is-invalid");
    all_valid = false;
  } else {
    product_category.removeClass("is-invalid");
    product_category.addClass("is-valid");
  }

  if (!product_desc.val()) {
    product_desc.removeClass("is-valid");
    product_desc.addClass("is-invalid");
    all_valid = false;
  } else {
    product_desc.removeClass("is-invalid");
    product_desc.addClass("is-valid");
  }

  if (!all_valid) {
    event.preventDefault();
  }
}

function doBindings() {
  $("#create-product-btn").click(handleCreateBtn);
}

$(document).ready(doBindings);
