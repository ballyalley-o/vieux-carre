import { hashSync } from 'bcrypt-ts-edge'
const _mockData = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@vieux-carre.com',
      password: hashSync('123456', 10),
      role: 'admin'
    },
    {
      name: 'Hank Hill',
      email: 'propane.love@strickland.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Dale Gribble',
      email: 'dale@dale-tech.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Bill Dauterive',
      email: 'bill.d@usarmy.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Jeff Boomhauer',
      email: 'boomhauer@yahoo.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Rusty Shackleford',
      email: 'rusty@godaddy.com',
      password: hashSync('123456', 10),
      role: 'user'
    }
  ],
  products: [
    {
      name: 'Polo Sporting Stretch Shirt',
      slug: 'polo-sporting-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Classic Polo style with modern comfort',
      images: ['/__mock/product/p1-1.jpg', '/__mock/product/p1-2.jpg'],
      price: 59.99,
      brand: 'Polo',
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: 'banner-1.jpg'
    },
    {
      name: 'Brooks Brothers Long Sleeved Shirt',
      slug: 'brooks-brothers-long-sleeved-shirt',
      category: "Men's Dress Shirts",
      description: 'Timeless style and premium comfort',
      images: ['/__mock/product/p2-1.jpg', '/__mock/product/p2-2.jpg'],
      price: 85.9,
      brand: 'Brooks Brothers',
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: 'banner-2.jpg'
    },
    {
      name: 'Tommy Hilfiger Classic Fit Dress Shirt',
      slug: 'tommy-hilfiger-classic-fit-dress-shirt',
      category: "Men's Dress Shirts",
      description: 'A perfect blend of sophistication and comfort',
      images: ['/__mock/product/p3-1.jpg', '/__mock/product/p3-2.jpg'],
      price: 99.95,
      brand: 'Tommy Hilfiger',
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null
    },
    {
      name: 'Calvin Klein Slim Fit Stretch Shirt',
      slug: 'calvin-klein-slim-fit-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Streamlined design with flexible stretch fabric',
      images: ['/__mock/product/p4-1.jpg', '/__mock/product/p4-2.jpg'],
      price: 39.95,
      brand: 'Calvin Klein',
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null
    },
    {
      name: 'Polo Ralph Lauren Oxford Shirt',
      slug: 'polo-ralph-lauren-oxford-shirt',
      category: "Men's Dress Shirts",
      description: 'Iconic Polo design with refined oxford fabric',
      images: ['/__mock/product/p5-1.jpg', '/__mock/product/p5-2.jpg'],
      price: 79.99,
      brand: 'Polo',
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null
    },
    {
      name: 'Polo Classic Pink Hoodie',
      slug: 'polo-classic-pink-hoodie',
      category: "Men's Sweatshirts",
      description: 'Soft, stylish, and perfect for laid-back days',
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 99.99,
      brand: 'Polo',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null
    }
  ]
}

export default _mockData
