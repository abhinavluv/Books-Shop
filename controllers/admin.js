const Product = require('../models/Product');

exports.getAddProduct = (request, response, next) => {
    response.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: false });
};

exports.postAddProduct = (request, response, next) => {
    console.log(request.body);
    const productTitle = request.body.title;
    const productImageURL = request.body.imageURL;
    const productDescription = request.body.description;
    const productPrice = request.body.price;

    const product = new Product(null, productTitle, productPrice, productDescription, productImageURL);
    product.save();
    response.redirect('/');
};

exports.getEditProduct = (request, response, next) => {
    const editMode = request.query.edit;
    if (!editMode) {
        return response.redirect('/');
    }
    const prodId = request.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return response.redirect('/');
        }
        response.render('admin/edit-product', { pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product: product });
    });
};

exports.postEditProduct = (request, response, next) => {
    const prodId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedPrice = request.body.price;
    const updatedDescription = request.body.description;
    const updatedImageURL = request.body.imageURL;

    const updatedProduct = new Product(prodId, updatedTitle, updatedPrice, updatedDescription, updatedImageURL);
    console.log("Updated Product: ", updatedProduct);
    updatedProduct.save();
    response.redirect('/admin/products');
};

exports.getProducts = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('admin/products', { products: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};

exports.postDeleteProduct = (request, response, next) => {
    const prodId = request.body.productId;
    Product.deleteById(prodId);
    response.redirect('/admin/products');
};