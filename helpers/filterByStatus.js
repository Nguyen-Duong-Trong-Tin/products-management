module.exports.filterByStatus = (query) => {
  const buttonsStatus = [
    {
      content: "All",
      status: "",
      active: ""
    },
    {
      content: "Active",
      status: "active",
      active: ""
    },
    {
      content: "Inactive",
      status: "inactive",
      active: ""
    }
  ];
  if (query.status) {
    const idx = buttonsStatus.findIndex(item => item.status === query.status);
    buttonsStatus[idx].active = "active";
  } else {
    buttonsStatus[0].active = "active";
  }

  return {
    buttonsStatus: buttonsStatus,
    status: query.status
  }
}