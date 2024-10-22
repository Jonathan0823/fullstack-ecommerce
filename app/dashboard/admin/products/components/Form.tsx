"use client";
import { SingleImageDropzone } from "@/app/components/dropimage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
}

const ProductForm: FC<ProductFormProps> = ({ categories }) => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<{
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
  } | null>(null);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !brand || !stock || !price || !description || !selectedCategory) {
      setError(true);
      return;
    }
    
    console.log(selectedCategory);
    console.log(images);
    console.log("Form submitted");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full lg:w-[400px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <p className="font-semibold mb-2">Create Product</p>
        <p className="text-sm font-semibold">Image</p>
        <div className="flex justify-center">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <p className="text-sm font-semibold">Name</p>
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm font-semibold">Category</p>
        <div className="">
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm font-semibold">Brand</p>
        <Input
          placeholder="Product Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <p className="text-sm font-semibold">Stock</p>
        <Input
          placeholder="Product Stock font-semibold"
          type="number"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
        <p className="text-sm font-semibold">Price</p>
        <Input
          placeholder="Product Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <p className="text-sm font-semibold">Description</p>
        <textarea
          placeholder="Product Description"
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          rows={4} // Adjust the number of rows as needed
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">
            All input field must be filled!
          </p>
          
        )}

        <Button
          className="mt-3"
          type="submit"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress);
                },
                options: {
                  temporary: true,
                },
              });
              setImages(res);
            }
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
