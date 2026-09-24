import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";

const spliceIntoSmallerArray = JSON.parse(
  await readFile(
    new URL("./spliceIntoSmallerArray.json", import.meta.url),
    "utf8",
  ),
);
console.log("URL loaded:", !!process.env.SUPABASE_URL);
console.log("Service key loaded:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

const seedDatabase = async () => {
  console.log("Starting MetaWear catalog migration...\n");

  for (const [categoryKey, items] of Object.entries(spliceIntoSmallerArray)) {
    if (!items.length) continue;

    const categoryTitle = items[0].character || categoryKey;

    console.log(`Processing: ${categoryTitle}`);

    // Create category or retrieve existing category
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .upsert(
        {
          title: categoryTitle,
        },
        {
          onConflict: "title",
        },
      )
      .select()
      .single();

    if (categoryError) throw categoryError;

    const products = items.map((product) => ({
      id: product.id,
      category_id: category.id,

      title: product.title,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      character: product.character,

      price: product.price,
      original_price: product.originalPrice ?? null,

      currency: product.currency,

      rating: product.rating,
      review_count: product.reviewCount,
      stock: product.stock,

      sizes: product.sizes ?? [],
      colors: product.colors ?? [],

      image: product.image,
      description: product.description,
      features: product.features ?? [],

      is_featured: product.isFeatured ?? false,
      is_sale: product.isSale ?? false,
      is_new: product.isNew ?? false,
    }));

    const { error: productsError } = await supabase
      .from("products")
      .upsert(products, {
        onConflict: "id",
      });

    if (productsError) throw productsError;

    console.log(`✓ ${products.length} products added`);
  }

  console.log("\n🔥 MetaWear catalog migration complete!");
};

seedDatabase().catch((error) => {
  console.error("\n❌ Migration failed:");
  console.error(error);
  process.exit(1);
});
