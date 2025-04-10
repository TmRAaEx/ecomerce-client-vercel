import fs from 'fs';
import path from 'path';

const BASE_URL = "https://ecomerce-client-vercel-arwp.vercel.app";

const apiurl = "https://e-commerce-api-vercel-ebon.vercel.app";
const getProductsAndCategoryLocations = async () => {
    try {
        const response = await fetch(`${apiurl}/products`, {})
        const products = await response.json();

        const locations = products.map(product => {
            return `/products/${product.id}`;
        })

        const categories = new Set

        products.forEach(product => {
            categories.add(`/categories/${product.category}`);
        })

        const catArray = [...categories];
        return {locations, catArray};
    } catch (e) {
        console.error(e);
    }
}


const {locations: ProductLocations, catArray: categories} = await getProductsAndCategoryLocations();


const staticPages = ["/", "/products", "/categories", "/login", "/signup", "/cart"]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 ${staticPages.map(page =>
    `<url>
        <loc>${BASE_URL}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`
).join('')}
${ProductLocations.map(location =>
    `<url>
        <loc>${BASE_URL}${location}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`
).join('')}
${categories.map(location =>
    `<url>
        <loc>${BASE_URL}${location}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`).join('')}
</urlset>`

try {
    fs.writeFileSync(path.resolve("public", "sitemap.xml"), sitemap)
    console.log('✅ Sitemap generated!');
} catch (e) {
    console.error('❌ Failed to generate sitemap:', e);
}
