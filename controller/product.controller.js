import xlsx from 'xlsx';
import Category from '../model/category.model.js';
import Product from '../model/product.model.js';

// Add products from Excel sheet
export const addExcelSheet = async (req, res, next) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];
  const data = xlsx.utils.sheet_to_json(sheet);
  try {
    for (let item of data) {
      let { title, description, price, discountPercentage, rating, stock = 100, brand = 'local', thumbnail, categoryName, images } = item;

      await Product.create({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        thumbnail,
        categoryName,
        images
      });
    }
    return res.status(200).json({ message: "Products added successfully.." });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "Internal server error" });
  }
}

// Add a single product
export const addoneproduct = (req, res, next) => {
  const { title, description, price, discountPercentage, rating, stock, brand, thumbnail, categoryName, images } = req.body;



  Product.create({
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
    categoryName,
    images: images
  })
    .then(() => {
      return res.status(200).json({ message: "Product added.." });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Something went wrong" });
    });
}

// View products by category
export const viewProductsByCategory = (req, res, next) => {
  Product.find({ categoryName: req.params.categoryName })
    .then(result => {
      return res.status(200).json({ message: "Categories", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Internal server error.." });
    });
}

// View all products with pagination
export const viewAllProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// Display all products
export const displayAllProducts = (req, res, next) => {
  Product.find()
    .then(result => {
      return res.status(200).json({ message: "All products", result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
}

// Remove a product
export const removeProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByIdAndDelete(productId)
    .then(result => {
      return res.status(200).json({ message: "Product removed successfully..", product: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Internal server error" });
    });
}

// View all by category
export const viewAllByCategory = (req, res, next) => {
  Category.find()
    .populate('products')
    .then(result => {
      return res.status(200).json({ message: "Products data", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Products", data: err });
    });
}

// Add products in bulk
export const addProductInBulk = async (req, res, next) => {
  const productList = req.body;
  try {
    for (let item of productList) {
      let { title, description, price, discountPercentage, rating, stock, brand, thumbnail, categoryName, images } = item;

      // Convert images array to a comma-separated string
      let imagesString = images.join(", ");

      await Product.create({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        thumbnail,
        categoryName,
        images: imagesString
      });
    }
    return res.status(200).json({ message: "Products added successfully.." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
}

// Update product rating
export const updateRating = (req, res, next) => {
  const { productId, rating } = req.body;
  Product.findByIdAndUpdate(productId, { rating })
    .then(result => {
      return res.status(200).json({ message: "Rating updated", result });
    })
    .catch(err => {
      console.log(err);
      return res.status(501).json({ message: "Internal server error" });
    });
}

// Get a list of unique brands
export const brandlist = (req, res, next) => {
  Product.distinct('brand')
    .then(result => {
      return res.status(200).json({ message: "Brand", data: result });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    });
}

// Get products by brand
export const getproductbybrand = (req, res, next) => {
  Product.find({ brand: req.body.brand })
    .then(result => {
      return res.status(200).json({ message: "Product list", product: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ error: err });
    });
}

// Get products by price range
export const getproductbyprice = async (req, res, next) => {
  const { min, max } = req.body;
  try {
    const products = await Product.find({
      price: { $gte: min, $lte: max }
    });
    return res.status(200).json({ productlist: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
