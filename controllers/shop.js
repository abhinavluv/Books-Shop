const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getProducts = (request, response, next) => {
    // const products = adminData.products;
    // response.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.fetchAll(products => {
        response.render('shop/product-list', { products: products, pageTitle: 'Products', path: '/products' });
    });
};

exports.getProductDetails = (request, response, next) => {
    const prodId = request.params.productId;
    // console.log('Product: ', prodId);
    Product.findById(prodId, product => {
        response.render('shop/product-detail', { pageTitle: product.title + ' Details', product: product, path: '/products' });
    });
};

exports.getIndex = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('shop/index', { products: products, pageTitle: 'Home', path: '/' });
    });
};

exports.getCart = (request, response, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.quantity });
                }
            }
            response.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart', products: cartProducts });
        });
    });
};

exports.postCart = (request, response, next) => {
    const prodId = request.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    console.log(prodId);
    response.redirect('/cart');
};

exports.postCartDeleteProduct = (request, response, next) => {
    const prodId = request.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        response.redirect('/cart');
    });
};

exports.getOrders = (request, response, next) => {
    response.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders' });
};

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};