// prerender.config.ts
export const config = {
    discoverRoutes: true, // let Angular crawl static routes
    routes: [
      '/', '/home', '/products', '/brands', '/categories', '/login', '/signup'
    ],
    excludeRoutes: [
      '/checkout/:id',
      '/productDetails/:id',
      '/brandProducts/:name',
      '/categoryProducts/:name',
      '/subcategoryProducts/:name'
    ]
  };
  