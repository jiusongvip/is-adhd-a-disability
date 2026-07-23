/**
 * Download images from Unsplash/Pexels and convert to WebP
 * Usage: node scripts/download-images.mjs
 */
import sharp from 'sharp';
import { createWriteStream, mkdirSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

// Image mapping: { filename, url, description, width }
// Unsplash: append ?w=1200&q=80&auto=format for 1200px wide
// Pexels: append ?auto=compress&cs=tinysrgb&w=1260&dpr=1
const images = [
  {
    filename: 'og-image',
    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&auto=format',
    description: 'Neural pathways / brain visualization',
    format: 'png', // OG images should be PNG for social platforms
    width: 1200,
    height: 630,
  },
  {
    filename: 'ada-law',
    url: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=1',
    description: 'Gavel + scales of justice + legal books',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'workplace',
    url: 'https://images.pexels.com/photos/7691726/pexels-photo-7691726.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=1',
    description: 'Diverse team collaborating in office',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'school',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format',
    description: 'Empty school classroom',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'ssdi',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format',
    description: 'Documents and paperwork on desk',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'section-504',
    url: 'https://images.pexels.com/photos/7713166/pexels-photo-7713166.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=1',
    description: 'Student studying with laptop',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'accommodations',
    url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80&auto=format',
    description: 'Modern office workspace',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'rights',
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format',
    description: 'Document with pen on desk',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'blog-myths',
    url: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=1',
    description: 'Question mark on chalkboard',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'blog-doctor-note',
    url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&q=80&auto=format',
    description: 'Doctor / medical professional',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'blog-ada-cases',
    url: 'https://images.pexels.com/photos/6077448/pexels-photo-6077448.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=1',
    description: 'Close-up text beside gavel',
    format: 'webp',
    width: 1200,
  },
  {
    filename: 'by-country',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80&auto=format',
    description: 'World map / globe',
    format: 'webp',
    width: 1200,
  },
];

async function downloadAndConvert(img) {
  const ext = img.format;
  const outPath = resolve(outDir, `${img.filename}.${ext}`);

  console.log(`\n[${img.filename}] ${img.description}`);
  console.log(`  Source: ${img.url.substring(0, 80)}...`);

  try {
    const res = await fetch(img.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    console.log(`  Downloaded: ${(buffer.length / 1024).toFixed(1)} KB`);

    let pipeline = sharp(buffer).resize(img.width, img.height || null, {
      fit: img.height ? 'cover' : 'inside',
      withoutEnlargement: true,
    });

    if (ext === 'webp') {
      pipeline = pipeline.webp({ quality: 82 });
    } else if (ext === 'png') {
      pipeline = pipeline.png({ quality: 90 });
    }

    await pipeline.toFile(outPath);

    const { size } = await import('node:fs').then(fs => fs.promises.stat(outPath));
    console.log(`  Saved: ${outPath} (${(size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
  }
}

console.log(`Downloading ${images.length} images to ${outDir}...`);

for (const img of images) {
  await downloadAndConvert(img);
}

console.log('\nDone! Files in public/images/:');
const { readdirSync, statSync } = await import('node:fs');
for (const f of readdirSync(outDir).sort()) {
  const { size } = statSync(resolve(outDir, f));
  console.log(`  ${f} (${(size / 1024).toFixed(1)} KB)`);
}
