import NavBar from "@/app/components/NavBar";
import Products from "@/app/components/Products";
import { BACKEND_URL } from "@/lib/constant";

const page = async ({ params }: { params: { key: string } }) => {
  const decodedKey = decodeURIComponent(params.key);

  const res = await fetch(
    `${BACKEND_URL}/products/search/product?key=${params.key}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const products = await res.json();

  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Showing results for: {decodedKey}
        </h1>
        <Products products={products} />
      </div>
    </div>
  );
};

export default page;
