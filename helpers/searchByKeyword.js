module.exports.searchByKeyword = (query) => {
  const regex = new RegExp(query.keyword, "i");
  return {
    keyword: regex
  }
}