import { BACKEND_URL } from "@/lib/constant";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

const Products = async () => {
  const res = await fetch(`${BACKEND_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache", 
      "Expires": "0", 
    },
  });
  const products = await res.json();
  console.log(products);

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="group border shadow-lg rounded-md relative"
          >
            <div className="aspect-h-1 aspect-w-1 -z-0 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Image
                alt={product.name}
                src={product.image}
                width={300}
                height={350}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between mx-2">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.image}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm block font-medium text-gray-900">
                  {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
