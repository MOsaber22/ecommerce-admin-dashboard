var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("btnAdd");
var updateBtn = document.getElementById("btnUpdate");
var ProductsContainer;

if (localStorage.getItem("products") == null) {
  ProductsContainer = [];
} else {
  ProductsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function addProduct() {
  var product = {
    code: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescInput.value,
    image: `Images/${productImageInput.files[0]?.name}`, // ? => Optional Chaining
  };
  ProductsContainer.push(product);
  // clearForm();
  displayProducts();
  localStorage.setItem("products", JSON.stringify(ProductsContainer));
  // console.log(ProductsContainer);
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
}

function displayProducts() {
  var container = ``;
  for (var i = 0; i < ProductsContainer.length; i++) {
    container += `<div class="col-lg-3 col-sm-6">
                <div class="product-item shadow-sm text-center my-3 p-3">
                    <img src="${ProductsContainer[i].image}" alt="" class="w-100">
                    <h3 class="h-4">${ProductsContainer[i].code}</h3>
                    <h4 class="h-6">Category <span class="fw-bolder">${ProductsContainer[i].category}</span></h4>
                    <p class="text-secondary">${ProductsContainer[i].description}</p>
                    <h4 class="h-6">Price : <span class="text-danger">${ProductsContainer[i].price}$</span></h4>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 my-2">Delete <i class="fa-solid fa-trash-can"></i></button>
                    <button onclick="prepareUpdate(${i})" class="btn btn-outline-warning w-100 my-2">Update <i class="fa-solid fa-pen"></i></button>
                </div>
              </div>`;
  }
  document.getElementById("dataContainer").innerHTML = container;
}

function deleteProduct(deletedIndex) {
  ProductsContainer.splice(deletedIndex, 1);
  displayProducts();
  localStorage.setItem("products", JSON.stringify(ProductsContainer));
}

function searchProducts() {
  var searchTerm = searchInput.value;
  var searchContainer = ``;
  for (var i = 0; i < ProductsContainer.length; i++) {
    if (ProductsContainer[i].code.toLowerCase().includes(searchTerm.toLowerCase())) {
      searchContainer += `<div class="col-lg-3 col-sm-6">
                <div class="product-item shadow-sm text-center my-3 p-3">
                    <img src="${ProductsContainer[i].image}" alt="" class="w-100">
                    <h3 class="h-4">${ProductsContainer[i].code}</h3>
                    <h4 class="h-6">Category <span class="fw-bolder">${ProductsContainer[i].category}</span></h4>
                    <p class="text-secondary">${ProductsContainer[i].description}</p>
                    <h4 class="h-6">Price : <span class="text-danger">${ProductsContainer[i].price}$</span></h4>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 my-2">Delete <i class="fa-solid fa-trash-can"></i></button>
                    <button onclick="prepareUpdate(${i})" class="btn btn-outline-warning w-100 my-2">Update <i class="fa-solid fa-pen"></i></button>
                </div>
              </div>`;
    }
  }
  document.getElementById("dataContainer").innerHTML = searchContainer;
}

var updatedIndex;
function prepareUpdate(i) {
  updatedIndex = i;
  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');
  productNameInput.value = ProductsContainer[updatedIndex].code;
  productPriceInput.value = ProductsContainer[updatedIndex].price;
  productDescInput.value = ProductsContainer[updatedIndex].description;
  productCategoryInput.value = ProductsContainer[updatedIndex].category;
  // Note: File inputs cannot be pre-filled for security reasons, so we skip setting productImageInput.value
}

function updateProduct() {
  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
  ProductsContainer[updatedIndex].code = productNameInput.value;
  ProductsContainer[updatedIndex].price = productPriceInput.value;
  ProductsContainer[updatedIndex].description = productDescInput.value;
  ProductsContainer[updatedIndex].category = productCategoryInput.value;
  if (productImageInput.files[0]) {
    ProductsContainer[updatedIndex].image = `Images/${productImageInput.files[0].name}`;
  }
  displayProducts();
  clearForm();
  localStorage.setItem('products',JSON.stringify(ProductsContainer));
}

function validateInputs(element) {
  var regex = {
    productName: /^[A-Z][a-z]{2,15}$/,
    productPrice: /^[1-9][0-9]{2,5}$/,
    productCategory: /^(TV|PC|Phones|Electronics|Labtops)$/,
    productDesc: /^.{5,50}$/,
  }
  if (regex[element.id].test(element.value))
  {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
  }
  else 
  {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
  }
}