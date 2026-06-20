import { supabase } from './supabaseClient';

import img3870 from './assets/catalog/IMG_3870.png';
import img3908 from './assets/catalog/IMG_3908.png';
import img3912 from './assets/catalog/IMG_3912.png';
import img3913 from './assets/catalog/IMG_3913.png';
import img3914 from './assets/catalog/IMG_3914.png';
import img3915 from './assets/catalog/IMG_3915.png';
import img3948 from './assets/catalog/IMG_3948.jpg';
import img4024 from './assets/catalog/IMG_4024.png';
import img4085 from './assets/catalog/IMG_4085.png';

export const defaultProducts = [
  {
    id: 'prod3870',
    names: {
      RU: 'Цветочная нежность',
      EN: 'Floral Tenderness',
      TH: 'ความอ่อนโยนของดอกไม้'
    },
    category: 'flowers',
    price: '2 500 ฿',
    image: img3870,
    tags: {
      RU: 'Популярно',
      EN: 'Popular',
      TH: 'ยอดนิยม'
    }
  },
  {
    id: 'prod3908',
    names: {
      RU: 'Клубничное сияние',
      EN: 'Strawberry Glow',
      TH: 'ประกายสตรอเบอร์รี่'
    },
    category: 'strawberry',
    price: '1 800 ฿',
    image: img3908,
    tags: {
      RU: 'Бестселлер',
      EN: 'Bestseller',
      TH: 'ขายดี'
    }
  },
  {
    id: 'prod3912',
    names: {
      RU: 'Орхидея Делюкс',
      EN: 'Orchid Deluxe',
      TH: 'กล้วยไม้ดีลักซ์'
    },
    category: 'flowers',
    price: '2 900 ฿',
    image: img3912,
    tags: {
      RU: 'New',
      EN: 'New',
      TH: 'ใหม่'
    }
  },
  {
    id: 'prod3913',
    names: {
      RU: 'Звёздная гортензия',
      EN: 'Star Hydrangea',
      TH: 'ไฮเดรนเยียแห่งดวงดาว'
    },
    category: 'flowers',
    price: '3 200 ฿',
    image: img3913,
    tags: {
      RU: 'Deluxe',
      EN: 'Deluxe',
      TH: 'ดีลักซ์'
    }
  },
  {
    id: 'prod3914',
    names: {
      RU: 'Розовый закат',
      EN: 'Pink Sunset',
      TH: 'พระอาทิตย์ตกสีชมพู'
    },
    category: 'flowers',
    price: '2 400 ฿',
    image: img3914,
    tags: {
      RU: 'Популярно',
      EN: 'Popular',
      TH: 'ยอดนิยม'
    }
  },
  {
    id: 'prod3915',
    names: {
      RU: 'Клубника в бельгийском шоколаде',
      EN: 'Strawberries in Belgian Chocolate',
      TH: 'สตรอเบอร์รี่ในช็อกโกแลตเบลเยียม'
    },
    category: 'strawberry',
    price: '1 600 ฿',
    image: img3915,
    tags: {
      RU: 'Galaxy Box',
      EN: 'Galaxy Box',
      TH: 'Galaxy Box'
    }
  },
  {
    id: 'prod3948',
    names: {
      RU: 'Шоколадный каприз',
      EN: 'Chocolate Caprice',
      TH: 'ความรักช็อกโกแลต'
    },
    category: 'strawberry',
    price: '2 100 ฿',
    image: img3948,
    tags: {
      RU: 'New',
      EN: 'New',
      TH: 'ใหม่'
    }
  },
  {
    id: 'prod4024',
    names: {
      RU: 'Ягодный салют',
      EN: 'Berry Salute',
      TH: 'การแสดงความยินดีจากผลไม้'
    },
    category: 'strawberry',
    price: '1 900 ฿',
    image: img4024,
    tags: {
      RU: 'Бестселлер',
      EN: 'Bestseller',
      TH: 'ขายดี'
    }
  },
  {
    id: 'prod4085',
    names: {
      RU: 'Космический букет премиум',
      EN: 'Cosmic Premium Bouquet',
      TH: 'ช่อดอกไม้คоสมิกพรีเมียม'
    },
    category: 'flowers',
    price: '3 500 ฿',
    image: img4085,
    tags: {
      RU: 'Deluxe',
      EN: 'Deluxe',
      TH: 'ดีลักซ์'
    }
  }
];

export const formatPrice = (priceInput) => {
  const numbersOnly = String(priceInput).replace(/[^\d]/g, '');
  if (!numbersOnly) return '0 ฿';
  const formattedNum = Number(numbersOnly).toLocaleString('ru-RU');
  return `${formattedNum} ฿`;
};

// Map database row to component format
const mapProductFromDB = (p) => ({
  id: p.id,
  names: p.names || { RU: '', EN: '', TH: '' },
  category: p.category,
  price: formatPrice(p.price),
  image: p.image,
  tags: p.tags || { RU: '', EN: '', TH: '' }
});

// Local Storage fallbacks in case of Supabase offline/error state
const getLocalStorageFallback = () => {
  const stored = localStorage.getItem('nebula_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local storage products', e);
    }
  }
  return defaultProducts;
};

const saveLocalStorageFallback = (products) => {
  localStorage.setItem('nebula_products', JSON.stringify(products));
};

// Seed default products to database
const seedDefaultProducts = async () => {
  const rows = defaultProducts.map((p) => ({
    id: p.id,
    names: p.names,
    category: p.category,
    price: parseInt(p.price.replace(/[^\d]/g, ''), 10),
    image: p.image,
    tags: p.tags
  }));

  const { data, error } = await supabase
    .from('products')
    .insert(rows)
    .select();

  if (error) {
    console.error('Failed to seed default products into Supabase', error);
    return defaultProducts;
  }

  return data;
};

// Upload Base64 image to Cloudinary via REST API with auto-optimization format parameters
export const uploadImageToStorage = async (productId, imageBase64OrUrl) => {
  if (!imageBase64OrUrl || !imageBase64OrUrl.startsWith('data:image/')) {
    return imageBase64OrUrl;
  }

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn('Cloudinary environment credentials missing, saving image as base64 row in DB');
      return imageBase64OrUrl;
    }

    const formData = new FormData();
    formData.append('file', imageBase64OrUrl);
    formData.append('upload_preset', uploadPreset);
    formData.append('public_id', productId);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const err = await response.json();
      console.warn('Cloudinary upload endpoint error, falling back to base64 row storage', err);
      return imageBase64OrUrl;
    }

    const data = await response.json();
    let secureUrl = data.secure_url;

    // Inject optimization transformations f_auto, q_auto
    if (secureUrl && secureUrl.includes('/upload/')) {
      secureUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    return secureUrl || imageBase64OrUrl;
  } catch (err) {
    console.error('Error uploading image to Cloudinary', err);
    return imageBase64OrUrl;
  }
};


// Main CRUD Actions

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase fetch failed, loading localStorage fallback', error);
      return getLocalStorageFallback();
    }

    if (!data || data.length === 0) {
      console.log('Products table empty, seeding defaults...');
      const seeded = await seedDefaultProducts();
      return seeded.map(mapProductFromDB);
    }

    return data.map(mapProductFromDB);
  } catch (err) {
    console.error('Products service fetch error', err);
    return getLocalStorageFallback();
  }
};

export const insertProduct = async (product) => {
  const imageUrl = await uploadImageToStorage(product.id, product.image);
  
  const dbProduct = {
    id: product.id,
    names: product.names,
    category: product.category,
    price: parseInt(product.price.replace(/[^\d]/g, ''), 10),
    image: imageUrl,
    tags: product.tags
  };

  const { data, error } = await supabase
    .from('products')
    .insert([dbProduct])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // Update localStorage cache as fallback
  const localList = getLocalStorageFallback();
  saveLocalStorageFallback([...localList, mapProductFromDB(data[0])]);

  return mapProductFromDB(data[0]);
};

export const updateProduct = async (product) => {
  const imageUrl = await uploadImageToStorage(product.id, product.image);

  const dbProduct = {
    names: product.names,
    category: product.category,
    price: parseInt(product.price.replace(/[^\d]/g, ''), 10),
    image: imageUrl,
    tags: product.tags
  };

  const { data, error } = await supabase
    .from('products')
    .update(dbProduct)
    .eq('id', product.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const mapped = mapProductFromDB(data[0]);

  // Update localStorage cache as fallback
  const localList = getLocalStorageFallback();
  saveLocalStorageFallback(localList.map(p => p.id === product.id ? mapped : p));

  return mapped;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Update localStorage cache as fallback
  const localList = getLocalStorageFallback();
  saveLocalStorageFallback(localList.filter(p => p.id !== id));
};

export const resetProductsToDefault = async () => {
  // Try to delete all items
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .neq('id', 'dummy_id_never_matching');

  if (deleteError) {
    console.warn('Database reset failed, resetting local cache only', deleteError);
  }

  const seeded = await seedDefaultProducts();
  const mapped = seeded.map(mapProductFromDB);
  saveLocalStorageFallback(mapped);
  return mapped;
};
