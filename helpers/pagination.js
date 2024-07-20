module.exports = async (pagination, query, Model) => {
  const quantityItems = await Model.countDocuments({ deleted: false });

  pagination.quantityPages = Math.ceil(quantityItems / pagination.limit);

  if (query.page) {
    const currentPage = parseInt(query.page);

    if (!isNaN(currentPage)) {
      pagination.currentPage = currentPage;
      pagination.skip = (pagination.currentPage - 1) * pagination.limit;
    }
  }

  return pagination;
}