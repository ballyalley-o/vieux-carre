export const CACHE_KEY = {
  products          : (page = 1) => `cache:products:page=${page}`,
  productById       : (id: string) => `cache:product:${id}`,
  productBySlug     : (slug: string) => `cache:product:${slug}`,
  promotions        : `cache:promotions`,
  promotionsByType  : (type: string) => `cache:promotion:${type}`,
  promotionDOTM     : `cache:promotion:DOTM`,
  featuredProducts  : 'cache:products:featured',
  categories        : 'cache:categories:',
  myBag             : `cache:mybag:`,
  myBagId           : (id: string) => `cache:mybag:${id}`,
  orders            : (page = 1) => `cache:orders:page=${page}`,
  myOrders          : (page = 1) => `cache:myorders:page=${page}`,
  orderById         : (id: string) => `cache:order:${id}`,
  orderSummary      : `cache:orders:summary`,
  reviewByProductId : (id: string) => `cache:review:${id}`,
  reviewsByProductId: (id: string) => `cache:reviews:${id}`,
  users             : (page = 1) => `cache:users:page=${page}`,
  userById          : (id: string) => `cache: user:${id}`
}

export const CACHE_TTL = {
  default           : 300,
  products          : 300,
  productById       : 600,
  productBySlug     : 600,
  promotions        : 400,
  promotionsByType  : 600,
  promotionDOTM     : 600,
  featuredProducts  : 180,
  categories        : 300,
  myBag             : 600,
  orders            : 300,
  myOrders          : 300,
  orderById         : 500,
  orderSummary      : 300,
  reviewByProductId : 400,
  reviewsByProductId: 300,
  users             : 300,
  userById          : 600
}

export const LOCAL_STORAGE_KEY = {
  productCreate: `draft:productform:create`,
  productUpdate: `draft:productform:update`,
  authSignIn   : `draft:authform:signin`,
  authSignUp   : `draft:authform:signup`
}