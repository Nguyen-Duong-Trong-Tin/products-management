let count = 0;

const createTreeRecursion = (arr, parentId = "") => {
  const tree = [];
  arr.forEach(item => {
    if (item.parent_id === parentId) {
      const newItem = item;
      newItem.count = ++count;
      const children = createTreeRecursion(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.createTree = (arr, parentId = "") => {
  count = 0;
  return createTreeRecursion(arr, parentId);
}