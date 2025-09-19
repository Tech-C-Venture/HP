// Cloudflare Worker for image optimization and delivery
// Deploy this to Cloudflare Workers and set up a route like images.techc-venture.com/*

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // Remove leading slash

    // Parse query parameters for image transformations
    const width = url.searchParams.get('w');
    const height = url.searchParams.get('h');
    const quality = url.searchParams.get('q') || '85';
    const format = url.searchParams.get('f') || 'auto';

    // Get the original image from R2
    const object = await env.IMAGES_BUCKET.get(key);

    if (!object) {
      return new Response('Image not found', { status: 404 });
    }

    // Set up response headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('ETag', object.httpEtag);

    // Check if client already has the image cached
    if (request.headers.get('If-None-Match') === object.httpEtag) {
      return new Response(null, { status: 304, headers });
    }

    // Apply image transformations if requested
    if (width || height || format !== 'auto') {
      try {
        const transformedImage = await applyTransformations(
          object.body,
          { width, height, quality, format }
        );

        headers.set('Content-Type', getMimeType(format));
        return new Response(transformedImage, { headers });
      } catch (error) {
        console.error('Image transformation failed:', error);
        // Fall back to original image
      }
    }

    // Return original image
    headers.set('Content-Type', object.httpMetadata.contentType || 'image/jpeg');
    return new Response(object.body, { headers });
  }
};

async function applyTransformations(imageBody, options) {
  // In a real implementation, you would use an image processing library
  // like @cloudflare/images or integrate with Cloudflare Images
  // For now, we'll return the original image

  // Example using Cloudflare Images (if available)
  // const image = await cf.image(imageBody);
  // if (options.width) image.width(parseInt(options.width));
  // if (options.height) image.height(parseInt(options.height));
  // if (options.quality) image.quality(parseInt(options.quality));
  // if (options.format !== 'auto') image.format(options.format);
  // return await image.arrayBuffer();

  return imageBody;
}

function getMimeType(format) {
  const mimeTypes = {
    'webp': 'image/webp',
    'avif': 'image/avif',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif'
  };
  return mimeTypes[format] || 'image/jpeg';
}