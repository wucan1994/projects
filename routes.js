function route(pathname, res) {
    if (pathname === '/') {
        res.end(JSON.stringify({
            data: {
                msg: 'hello world!'
            },
            status: 'success'
        }))
    } else if (pathname === '/home') {
        res.end(JSON.stringify({
            data: {
                msg: 'Welcome Home!'
            },
            status: 'success'
        }))
    }
}

exports.route = route;