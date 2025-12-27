'use client';

import Image from 'next/image';

const products = [
  {
    title: '4K PTZ CAMERA',
    subtitle: 'Smooth and Silent Movement',
    image: '/ptz.jpg', // Update to match your public path or move to public folder
    alt: '4K PTZ Camera',
  },
  {
    title: 'LED RING LIGHT',
    subtitle: 'Ideal for Video Creation, Beauty Salons, Teaching',
    image: '/ring.jpg',
    alt: 'LED Ring Light',
  },
  {
    title: 'VEO α CAM',
    subtitle: 'Bring your vision to life with',
    image: '/veo.jpg',
    alt: 'VEO Alpha Cam',
  },
];

export default function ProductShowcase() {
  return (
    <div className="bg-black text-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        PencilAi Product Showcase
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105 duration-300"
          >
            <Image
              src={product.image}
              alt={product.alt}
              width={500}
              height={500}
              className="w-full object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{product.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
