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