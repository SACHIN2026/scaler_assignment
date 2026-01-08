const db = require('./config/database');

const categories = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Fashion', description: 'Clothing and accessories' },
  { name: 'Home & Kitchen', description: 'Home appliances and kitchen items' },
  { name: 'Books', description: 'Books and stationery' },
  { name: 'Mobile Phones', description: 'Smartphones and accessories' },
  { name: 'Computers', description: 'Laptops, desktops and accessories' },
  { name: 'Appliances', description: 'Home and kitchen appliances' },
  { name: 'Sports', description: 'Sports equipment and accessories' }
];

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Apple iPhone 15 Pro with A17 Pro chip and titanium design',
    price: 129900,
    original_price: 139900,
    discount_percentage: 7,
    category_id: 5,
    brand: 'Apple',
    stock: 25,
    rating: 4.6,
    reviews_count: 1523,
    image_url: 'https://images.unsplash.com/photo-1696446702297-80fd5546f939?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1696446702297-80fd5546f939?w=500&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
      'https://images.unsplash.com/photo-1695048133082-19e8f59a57bb?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Display': '6.1-inch Super Retina XDR display',
      'Processor': 'A17 Pro chip',
      'Camera': '48MP Main camera',
      'Storage': '256GB',
      'Battery': 'Up to 23 hours video playback',
      'Color': 'Natural Titanium'
    })
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Samsung Galaxy S24 Ultra with AI-powered features and S Pen',
    price: 124999,
    original_price: 134999,
    discount_percentage: 7,
    category_id: 5,
    brand: 'Samsung',
    stock: 30,
    rating: 4.5,
    reviews_count: 2341,
    image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '200MP Main camera',
      'Storage': '256GB',
      'RAM': '12GB',
      'S Pen': 'Included'
    })
  },
  {
    name: 'MacBook Air M3',
    description: 'Apple MacBook Air with M3 chip - Lightweight and powerful',
    price: 114900,
    original_price: 119900,
    discount_percentage: 4,
    category_id: 6,
    brand: 'Apple',
    stock: 15,
    rating: 4.8,
    reviews_count: 892,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Processor': 'Apple M3 chip',
      'Display': '13.6-inch Liquid Retina',
      'Memory': '8GB unified memory',
      'Storage': '256GB SSD',
      'Battery': 'Up to 18 hours',
      'Weight': '1.24 kg'
    })
  },
  {
    name: 'Dell XPS 15',
    description: 'Dell XPS 15 - Premium performance laptop with InfinityEdge display',
    price: 149999,
    original_price: 169999,
    discount_percentage: 12,
    category_id: 6,
    brand: 'Dell',
    stock: 10,
    rating: 4.4,
    reviews_count: 567,
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Processor': 'Intel Core i7-13700H',
      'Display': '15.6-inch FHD+',
      'Memory': '16GB DDR5',
      'Storage': '512GB SSD',
      'Graphics': 'NVIDIA RTX 4050'
    })
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium wireless noise cancelling headphones',
    price: 29990,
    original_price: 34990,
    discount_percentage: 14,
    category_id: 1,
    brand: 'Sony',
    stock: 50,
    rating: 4.7,
    reviews_count: 3421,
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Type': 'Over-ear wireless',
      'Noise Cancelling': 'Industry-leading',
      'Battery': 'Up to 30 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g'
    })
  },
  {
    name: 'Nike Air Zoom Pegasus 40',
    description: 'Premium running shoes with responsive cushioning',
    price: 9995,
    original_price: 12995,
    discount_percentage: 23,
    category_id: 8,
    brand: 'Nike',
    stock: 100,
    rating: 4.3,
    reviews_count: 891,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Type': 'Running Shoes',
      'Upper': 'Engineered mesh',
      'Midsole': 'Nike React foam',
      'Outsole': 'Waffle pattern',
      'Weight': '272g'
    })
  },
  {
    name: 'LG 55" 4K OLED TV',
    description: 'LG OLED TV with stunning picture quality and webOS',
    price: 139990,
    original_price: 179990,
    discount_percentage: 22,
    category_id: 1,
    brand: 'LG',
    stock: 8,
    rating: 4.6,
    reviews_count: 234,
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Display': '55-inch 4K OLED',
      'Resolution': '3840 x 2160',
      'HDR': 'Dolby Vision IQ',
      'Smart TV': 'webOS 23',
      'Refresh Rate': '120Hz'
    })
  },
  {
    name: 'Atomic Habits',
    description: 'Atomic Habits by James Clear - Tiny Changes, Remarkable Results',
    price: 599,
    original_price: 799,
    discount_percentage: 25,
    category_id: 4,
    brand: 'Penguin Random House',
    stock: 200,
    rating: 4.8,
    reviews_count: 12453,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Author': 'James Clear',
      'Publisher': 'Penguin Random House',
      'Pages': '320',
      'Language': 'English',
      'Format': 'Paperback'
    })
  },
  {
    name: 'Instant Pot Duo',
    description: '7-in-1 Electric Pressure Cooker, Sterilizer, Slow Cooker',
    price: 8999,
    original_price: 12999,
    discount_percentage: 31,
    category_id: 7,
    brand: 'Instant Pot',
    stock: 45,
    rating: 4.5,
    reviews_count: 4521,
    image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Capacity': '6 Quart',
      'Functions': '7-in-1',
      'Material': 'Stainless Steel',
      'Power': '1000W',
      'Safety': '10+ safety features'
    })
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight fit jeans - Original since 1873',
    price: 3999,
    original_price: 4999,
    discount_percentage: 20,
    category_id: 2,
    brand: 'Levi\'s',
    stock: 150,
    rating: 4.4,
    reviews_count: 2341,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Fit': 'Straight',
      'Material': '100% Cotton',
      'Wash': 'Medium Wash',
      'Style': '501 Original',
      'Origin': 'Made in India'
    })
  },
  {
    name: 'Canon EOS R6 Mark II',
    description: 'Full-frame mirrorless camera with advanced features',
    price: 239990,
    original_price: 259990,
    discount_percentage: 8,
    category_id: 1,
    brand: 'Canon',
    stock: 5,
    rating: 4.7,
    reviews_count: 156,
    image_url: 'https://images.unsplash.com/photo-1606980644398-c226b3e3fa4c?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1606980644398-c226b3e3fa4c?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Sensor': '24.2MP Full-frame CMOS',
      'Video': '4K 60fps',
      'ISO': '100-102400',
      'Stabilization': '5-axis IBIS',
      'Autofocus': 'Dual Pixel CMOS AF II'
    })
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Premium running shoes with BOOST cushioning',
    price: 15999,
    original_price: 17999,
    discount_percentage: 11,
    category_id: 8,
    brand: 'Adidas',
    stock: 80,
    rating: 4.4,
    reviews_count: 723,
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80'
    ]),
    specifications: JSON.stringify({
      'Type': 'Running Shoes',
      'Technology': 'BOOST cushioning',
      'Upper': 'Primeknit+',
      'Outsole': 'Continental rubber',
      'Weight': '310g'
    })
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Initialize database tables first
    await db.initialize();

    // Insert categories
    console.log('Inserting categories...');
    for (const category of categories) {
      await db.run(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [category.name, category.description]
      );
    }
    console.log(`✓ Inserted ${categories.length} categories`);

    // Insert products
    console.log('Inserting products...');
    for (const product of products) {
      await db.run(
        `INSERT INTO products (name, description, price, original_price, discount_percentage, 
         category_id, brand, stock, rating, reviews_count, image_url, images, specifications) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.description,
          product.price,
          product.original_price,
          product.discount_percentage,
          product.category_id,
          product.brand,
          product.stock,
          product.rating,
          product.reviews_count,
          product.image_url,
          product.images,
          product.specifications
        ]
      );
    }
    console.log(`✓ Inserted ${products.length} products`);

    console.log('✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
