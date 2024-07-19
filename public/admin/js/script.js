// Filter By Status
const buttonsStatus = document.querySelectorAll(".products .card .btn");

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

// End Filter By Status