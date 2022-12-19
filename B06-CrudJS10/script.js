var msgValidation = document.getElementById("alert");
var isEditing = false;

var app = new (function () {
  this.products = document.getElementById("ItemsTable");
  this.submitBtn = document.getElementById("submitBtn");
  this.editBtn = document.getElementById("editBtn");


  this.Items = [];
  this.Brands = [];
  this.Price = [];
  this.Type = [];
  this.Discount = [];
  this.Date = [];

  // Show Validation message
  function ErrorAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    //location to put new div in html
    div.appendChild(document.createTextNode(message));
    const wrapper = document.querySelector(".formbold-form-wrapper");
    const group = document.querySelector(".error");
    wrapper.insertBefore(div, group);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  //Display Items
  this.displayProduct = function () {
    var data = "";
    if(this.Items.length> 0){

      for (i = 0; i < this.Items.length; i++) {
        data += `<tr> <td> ${this.Items[i]} </td>
                        <td> ${this.Brands[i]} </td>
                        <td> ${this.Date[i]} </td>
                        <td> ${this.Price[i]} </td>
                        <td> ${this.Type[i]}  </td>
                        <td> ${this.Discount[i]} </td>
                        <td><button class="table-btn btn update" id="editBtn">Update</button>
                        <button class="table-btn btn delete">Delete</button> </td></tr>`;
      }
      this.products.innerHTML = data; 
    }
  };

  // Add Items
  this.Add = function () {
    let Pattern = /^([ a-zA-Z]+)$/;

    // Get the value
    var newNameProduct = document.getElementById("addName").value;
    var newBrandProduct = document.getElementById("addBrand").value;
    var newDateProduct = document.getElementById("addDate").value;
    var newPriceProduct = document.getElementById("addPrice").value;
    var newTypeProduct = document.getElementById("addType").value;
    var newDiscountProduct = document.querySelector("form").elements.namedItem("discount").value

    // Add the new value
    if (
      newNameProduct.length == "" || newBrandProduct.length == "" ||
      newDateProduct.length == "" || newPriceProduct.length == "" ||
      newTypeProduct.length == "" || newDiscountProduct.length == ""
    ) {
      ErrorAlert("Please fill in all fields", "error");
    } else if (newNameProduct.length > 20) {
      ErrorAlert("Product Name must maximum 20 character", "error");
    } else if (newBrandProduct.length > 20) {
      ErrorAlert("Product Brand must maximum 20 character", "error");
    } else if (
      !Pattern.test(newNameProduct) ||
      !Pattern.test(newBrandProduct)
    ) {
      ErrorAlert("Veuillez saisir valide format", "error");
    } else if (
      newNameProduct.length < 20 && newNameProduct.length !== 0 &&
      Pattern.test(newNameProduct) && Pattern.test(newBrandProduct) &&
      newBrandProduct.length < 20 && newBrandProduct.length !== 0 && 
      newDateProduct.length !== 0 && newPriceProduct.length !== 0 && 
      newTypeProduct.length !== 0 && newDiscountProduct.length !== 0
    ) {
      
      this.Items.push(newNameProduct.trim());
      this.Brands.push(newBrandProduct.trim());
      this.Date.push(newDateProduct);
      this.Price.push(newPriceProduct);
      this.Type.push(newTypeProduct);
      this.Discount.push(newDiscountProduct);
      //message validation added product
      msgValidation.innerHTML = `<i class="fa-solid fa-check-double"></i> Product successfully added to your shopping cart.`;
      // Remove the validatin Message after 2 seconds
      setTimeout(function () {
        msgValidation.remove();
      }, 2000);

      // Reset input values
      this.resetForm= function(){
        //Selects all the inputs
        const inputs = document.querySelectorAll('.input-control');
        //Clear the content of each input
        inputs.forEach((input)=>input.value="");
        document.querySelector('input[name="discount"]:checked').checked = false;
    }
      this.resetForm();
      // Dislay the new list
      this.displayProduct();
    }
  };

  //delete button
  this.products.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      //delete confirmation 
      swal({
        title: "Are you sure?",
        text: "Once deleted, You will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          e.target.parentElement.parentElement.remove();
          swal("Poof! Your Product has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Product is safe!");
        }
      });
    }

    //update button
    this.edit = function(){
    if (e.target.classList.contains("update")) {
      trTarget = e.target.parentElement.parentElement;
      isEditing= true
      document.getElementById("addName").value = trTarget.cells[0].innerText;
      document.getElementById("addBrand").value = trTarget.cells[1].innerText;
      document.getElementById("addDate").value = trTarget.cells[2].innerText;
      document.getElementById("addPrice").value = parseFloat(
        trTarget.cells[3].innerText
      );
      document.getElementById("addType").value = trTarget.cells[4].innerText;
      document.querySelector("form").elements.namedItem("discount").value=trTarget.cells[5].innerText;

      //change button submit to Update
      submitBtn.style.backgroundColor = "#3e48fbd9";
      submitBtn.innerHTML = "Update Product";
      submitBtn.addEventListener("click", function handleClick() {
        submitBtn.innerHTML = "Add Product";
        submitBtn.style.backgroundColor = "#fbb43e";
      });
    }
  }
  this.edit()
  });
})();
