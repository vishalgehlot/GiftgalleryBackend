import Category from '../model/category.model.js';

// Add a single category
export const addCategory = (req, res, next) => {
  const { categoryName } = req.body;
  Category.create({ name: categoryName })
    .then(() => {
      return res.status(200).json({ message: "Category added successfully.." });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
}

// Add categories in bulk
export const addCategoryInBulk = async (req, res, next) => {
  const categoryList = req.body.categories;

  try {
    console.log(categoryList);
    for (let category of categoryList) {
      await Category.create({ name: category });
    }
    return res.status(200).json({ message: "Categories added successfully.." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
}
//View all categories
export const viewAllCategory = (req, res, next) => {
  Category.find()
    .then(result => {
      return res.status(200).json({ message: "Categories", categories: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.." });
    });
}


// Remove a category
export const removeCategory = (req, res, next) => {
  const { categoryName } = req.body;
  Category.findOneAndDelete({ name: categoryName })
    .then(result => {
      if (result) {
        return res.status(200).json({ message: "Category removed successfully..." });
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
}

// View a few categories (limited to 10)
export const fewcategory = (req, res, next) => {
  Category.find().limit(10)
    .then(result => {
      return res.status(200).json({ message: "Categories", data: result });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    });
}
