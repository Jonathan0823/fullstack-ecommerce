import { SingleImageDropzone } from "@/app/components/dropimage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constant";
import { useEdgeStore } from "@/lib/edgestore";
import { LinearProgress } from "@mui/material";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  product: {
    id: string;
    name: string;
    brand: string;
    image: string;
    stock: number;
    price: number;
    description: string;
    category: string;
  };
  refresh: () => void;
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
}

export function PopOverProduct({
  categories,
  product,
  refresh,
  session,
}: ProductFormProps) {
  const { edgestore } = useEdgeStore();
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedCategory
    ) {
      setError(true);
      return;
    }
    try {
        if (file){
            const resImg = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
            if (!resImg) {
              throw new Error("Image not uploaded");
            }
            setImage(resImg.url);

        }

      const res = await fetch(`${BACKEND_URL}/products/update`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session.backendTokens.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          name: name? name : product.name,
          image: image? image : product.image,
          categoryName: selectedCategory? selectedCategory : product.category,
          brand: brand? brand : product.brand,
          stock: stock? stock : product.stock,
          price: price? price : product.price,
          description: description? description : product.description,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      } else {
        await refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Popover>
      <PopoverTrigger>
        <Pencil className="cursor-pointer text-blue-500" />{" "}
      </PopoverTrigger>
      <PopoverContent className="max-h-[80vh] overflow-y-auto p-4 w-[400px]">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <p className="font-semibold mb-2">Create Product</p>
            <p className="text-sm font-semibold">Image</p>
            <div className="flex justify-center">
              <SingleImageDropzone
                width={50}
                height={50}
                value={file}
                dropzoneOptions={{
                  maxSize: 1024 * 1024 * 2,
                }}
                onChange={(file) => {
                  setFile(file);
                }}
              />
            </div>
            <LinearProgress variant="determinate" value={progress} />
            <p className="text-sm font-semibold">Name</p>
            <Input
              placeholder="Product Name"
              defaultValue={product.name}
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
              value={product.brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <p className="text-sm font-semibold">Stock</p>
            <Input
              placeholder="Product Stock font-semibold"
              type="number"
              defaultValue={product.stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
            <p className="text-sm font-semibold">Price</p>
            <Input
              placeholder="Product Price"
              type="number"
              defaultValue={product.price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <p className="text-sm font-semibold">Description</p>
            <textarea
              placeholder="Product Description"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              rows={4}
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm mt-1">
                All input field must be filled!
              </p>
            )}

            <Button className="mt-3" type="submit">
              Edit
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
