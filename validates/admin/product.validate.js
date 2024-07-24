module.exports.createItem = (req, res, next) => {
  if (req.body.title === "") {
    req.flash("error", "Please Input Your Title");
    res.redirect("back");
    return;
  }

  const price = req.body.price;  
  if (isNaN(parseInt(price)) || price[0] === '-') {
    req.flash("error", "Price Is Not Validate");
    res.redirect("back");
    return;
  }

  const discountPercentage = req.body.discountPercentage;  
  if (isNaN(parseInt(discountPercentage)) || discountPercentage[0] === '-') {
    req.flash("error", "Discount Percentage Is Not Validate");
    res.redirect("back");
    return;
  }

  const stock = req.body.stock;  
  if (isNaN(parseInt(stock)) || stock[0] === '-') {
    req.flash("error", "Stock Is Not Validate");
    res.redirect("back");
    return;
  }

  next();
}