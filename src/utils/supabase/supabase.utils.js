import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export const requestEmailChange = async (newEmail) => {
  const { data, error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) throw error;

  return data;
};

export const getCategoriesAndProducts = async () => {
  const { data, error } = await supabase.from("categories").select(`
      title,
      products (
        id,
        title,
        slug,
        brand,
        category,
        character,
        price,
        original_price,
        currency,
        rating,
        review_count,
        stock,
        sizes,
        colors,
        image,
        description,
        features,
        is_featured,
        is_sale,
        is_new
      )
    `);

  if (error) throw error;

  return data.map(({ title, products }) => ({
    title,

    items: products.map((product) => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      character: product.character,

      // PostgreSQL numeric values may come back as strings,
      // so normalize them for the existing frontend.
      price: Number(product.price),

      ...(product.original_price !== null && {
        originalPrice: Number(product.original_price),
      }),

      currency: product.currency,
      rating: Number(product.rating),
      reviewCount: product.review_count,
      stock: product.stock,

      sizes: product.sizes,
      colors: product.colors,
      image: product.image,
      description: product.description,
      features: product.features,

      ...(product.is_featured && {
        isFeatured: true,
      }),

      ...(product.is_sale && {
        isSale: true,
      }),

      ...(product.is_new && {
        isNew: true,
      }),
    })),
  }));
};

// EMAIL + PASSWORD SIGN IN
export const signInUserWithEmailAndPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
// GOOGLE SIGN IN
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) throw error;

  return data;
};
