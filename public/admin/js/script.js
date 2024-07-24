// Filter By Status Feature
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  const url = new URL(location.href);

  buttonsStatus.forEach(item => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      location.href = url.href;
    });
  });
}
// End Filter By Status Feature

// Search By Keyword Feature
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  const url = new URL(location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = e.target.elements.keyword.value;
    if (value) {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }

    location.href = url.href;
  });
}
// End Search By Keyword Feature

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination.length > 0) {
  const url = new URL(location.href);

  buttonsPagination.forEach(item => {
    item.addEventListener("click", () => {
      url.searchParams.set("page", item.getAttribute("button-pagination"));

      location.href = url.href;
    });
  });
}
// End Pagination

// Check Status
const checkAll = document.querySelector("input[name=checkAll]");
if (checkAll) {
  const checkByIdItems = document.querySelectorAll("input[name=checkByID]");

  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      checkByIdItems.forEach(item => item.checked = true);
    } else {
      checkByIdItems.forEach(item => item.checked = false);
    }
  });

  checkByIdItems.forEach(item => {
    item.addEventListener("click", () => {
      const countChecked = document.querySelectorAll("#table-products input[name=checkByID]:checked").length;

      checkAll.checked = countChecked === checkByIdItems.length;
    });
  });
}
// End Check Status

// Form Change Multi
const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkedItems = document.querySelectorAll("#table-products input[name=checkByID]:checked");

    const action = e.target.elements.status.value;

    if (action === "--- Select A Action ---") {
      return ;
    }

    if (action === "delete-all") {
      if (!confirm("Are you sure?")) {
        return ;
      }
    }
    
    if (checkedItems.length > 0) {
      const input = formChangeMulti.querySelector("input[name=ids]");

      const ids = [];
      checkedItems.forEach(item => {
        if (action === "change-position") {
          const position = item.closest("tr").querySelector("input[name=position]").value;
          ids.push(`${item.value}-${position}`);
        } else {
          ids.push(item.value);
        }
      });

      input.value = ids.join(", ");

      formChangeMulti.action += "?_method=PATCH";
      formChangeMulti.submit();
    }
  });
}
// End Form Change Multi

// Alert
const boxAlert = document.querySelector("[box-alert]");
if (boxAlert) {
  const time = parseInt(boxAlert.getAttribute("data-time"));
  const buttonClose = boxAlert.querySelector("[button-close-alert]");

  setTimeout(() => {
    boxAlert.classList.add("d-none");
  }, time);

  buttonClose.addEventListener("click", () => {
    boxAlert.classList.add("d-none");
  });
}
// End Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const buttonCloseImage = document.querySelector("[button-close-image]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });

  buttonCloseImage.addEventListener("click", () => {
    uploadImageInput.value = "";
    uploadImagePreview.src = "";
  });
}
// End Upload Image