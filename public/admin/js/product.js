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