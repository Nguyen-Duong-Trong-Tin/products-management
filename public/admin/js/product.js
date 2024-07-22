// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonsChangeStatus.length > 0) {
  const url = new URL(location.href);
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(item => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("data-status");
      const id = item.getAttribute("data-id");

      const newStatus = status === "active" ? "inactive" : "active";

      url.href = `${url.origin}${path}${newStatus}/${id}?_method=PATCH`;

      formChangeStatus.setAttribute("action", url.href);
      formChangeStatus.submit();
    });
  });
}
// End Change Status

// Delete Item
const buttonsDeleteItem = document.querySelectorAll("[button-delete-item]");
if (buttonsDeleteItem.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDeleteItem.forEach(item => {
    item.addEventListener("click", () => {
      if (!confirm("Are you sure?")) {
        return ;
      }
      
      const id = item.getAttribute("data-id");
      const action = `${path}${id}?_method=DELETE`;

      formDeleteItem.action = action;
      formDeleteItem.submit();
    });
  });
}
// End Delete Item