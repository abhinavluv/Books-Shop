exports.get404 = (request, response, next) => {
    // response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    response.status(404).render('404', { pageTitle: '404 - Page Not Found', path: '' })
}