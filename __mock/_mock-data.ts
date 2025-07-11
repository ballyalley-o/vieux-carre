import { GLOBAL } from "vieux-carre"
import { PromotionType } from "vieux-carre.authenticate/generated"

const _mockData = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@vieux-carre.com',
      role: 'admin',
      password: '123456'
    },
    {
      name: 'Hank Hill',
      email: 'propane.love@strickland.com',
      role: 'user',
      password: '123456'
    },
    {
      name: 'Dale Gribble',
      email: 'dale@dale-tech.com',
      role: 'user',
      password: '123456'
    },
    {
      name: 'Bill Dauterive',
      email: 'bill.d@usarmy.com',
      role: 'user',
      password: '123456'
    },
    {
      name: 'Jeff Boomhauer',
      email: 'boomhauer@yahoo.com',
      role: 'user',
      password: '123456'
    },
    {
      name: 'Rusty Shackleford',
      email: 'rusty@godaddy.com',
      role: 'user',
      password: '123456'
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
    },
    {
      name: 'Nike Alphafly 3 Premium',
      slug: 'polo-classic-pink-hoodie',
      category: "Men's Road Racing Shoes",
      description: 'Fine-tuned for marathon speed, the Alphafly 3 Premium helps push you beyond what you thought possible. Three innovative technologies power your run: a double dose of Air Zoom units helps launch you into your next step, a full-length carbon-fibre plate helps propel you forwards with ease and a heel-to-toe ZoomX foam midsole helps keep you fresh as you conquer your next race.',
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 380.20,
      brand: 'Nike',
      rating: 4.6,
      numReviews: 12,
      stock: 6,
      isFeatured: true,
      banner: null
    },
    {
      name: 'Nike Mercurial Superfly 10 Elite',
      slug: 'polo-classic-pink-hoodie',
      category: "FG High-Top Football Boot",
      description: "Obsessed with speed? So are the game's biggest stars. That's why we made this Elite boot with an improved 3/4-length Air Zoom unit. It gives you and the sport's fastest players the propulsive feel needed to break through the back line. The result is the most responsive Mercurial we've ever made, because you demand greatness from yourself and your footwear.",
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 274.99,
      brand: 'Nike',
      rating: 4.6,
      numReviews: 12,
      stock: 11,
      isFeatured: true,
      banner: null
    },
    {
      name: 'Nike Air Max Portal',
      slug: 'polo-classic-pink-hoodie',
      category: "Men's Shoes",
      description: "Transport your style with a new Air Max. The Portal is the perfect blend of chunky and sleek, combining the platform sole of 2000s with the minimalist upper of contemporary designs. We added an oval-shaped midsole with cloud-like cushioning for an elevated look you can wear every day. It's so comfortable it's out of this world.",
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 132.99,
      brand: 'Nike',
      rating: 4.6,
      numReviews: 12,
      stock: 7,
      isFeatured: true,
      banner: null
    },
    {
      name: 'Jordan Flight Court',
      slug: 'polo-classic-pink-hoodie',
      category: "Men's Shoes",
      description: "Inspired by the past, built for tomorrow. We remixed elements from the AJ3, AJ4 and AJ5 to create a fresh take on the classics. Smooth leather and soft suede give you style and durability while textile panels add breathability. Plus, embroidered details infuse these kicks with Jordan heritage.",
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 150,
      brand: 'Jordan',
      rating: 4.6,
      numReviews: 12,
      stock: 4,
      isFeatured: true,
      banner: null
    },
    {
      name: 'Nike Premium',
      slug: 'polo-classic-pink-hoodie',
      category: "Duffel Bag (45L)",
      description: "Made for weekend trips or extensive gym sessions, this duffel can do it all. The large main compartment features small pockets to help keep your items organised. A zip pocket on the outside lets you put small essentials within easy reach. Carry it however you want—whether that's with the detachable and adjustable shoulder strap or the padded dual handles. Like we said, this one can do it all.",
      images: ['/__mock/product/p6-1.jpg', '/__mock/product/p6-2.jpg'],
      price: 90,
      brand: 'Jordan',
      rating: 4.6,
      numReviews: 12,
      stock: 7,
      isFeatured: true,
      banner: null
    }
  ],
  promotions: [
    {
      title    : 'Free shipping over $175',
      content  : 'Enjoy free shipping on orders above $175!',
      type     : PromotionType.SWIPER,
      startDate: new Date(new Date().setDate(new Date().getDay() * 7)),
      endDate  : new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive : true,
      priority : 1,
      userId   : 'b2b0a9fa-7a70-43ab-aa57-74a3065c5490'
    },
    {
      title    : 'Exclusive Email Signup Deal',
      content  : 'Sign up to our newsletter and get 10% off.',
      type     : PromotionType.SWIPER,
      startDate: new Date(),
      endDate  : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isActive : true,
      priority : 2,
      userId   : 'b2b0a9fa-7a70-43ab-aa57-74a3065c5490'
    },
    {
      title    : 'New Arrivals',
      content  : 'New Arrivals & World Exclusive Heat Dropping Daily 🔥 Shop Now',
      type     : PromotionType.SWIPER,
      startDate: new Date(),
      endDate  : new Date(new Date().setDate(new Date().getDay() * 7)),
      isActive : true,
      priority : 3,
      userId   : 'b2b0a9fa-7a70-43ab-aa57-74a3065c5490'
    },
    {
      title     : 'Deal of the Month',
      content   : 'Every purchase comes with exclusive perks and offers, making this month a celebration of savvy choices and smart deals. Don\'t miss out!',
      image     : `${GLOBAL.SERVER_URL}/_next/image?url=%2Fimage%2Fpromo%2Fpromo.png&w=640&q=75`,
      type      : PromotionType.DOTM,
      startDate : new Date(),
      endDate   : new Date(new Date().setDate(new Date().getMonth() + 1)),
      isActive  : true,
      priority  : 1,
      targetType: 'product',
      productId : '9d4c3692-827f-4e56-aef7-036a2d67a179',
      userId    : 'b2b0a9fa-7a70-43ab-aa57-74a3065c5490'
    }
  ]
}

export default _mockData
