module.exports.createItem = (req, res, next) => {
  if (req.body.title === "") {
    req.flash("error", "Please Input Your Title");
    res.redirect("back");
    return;
  }

  next();
}