"use client";
import { SingleImageDropzone } from "@/app/components/dropimage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import React from "react";

interface ProductFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ handleSubmit }) => {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full lg:w-[400px]">
      <form onSubmit={handleSubmit}>
        <p className="font-semibold mb-2">Create Product</p>
        <p className="text-sm">Image</p>
        <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
        <p className="text-sm">Name</p>
        <Input placeholder="Category Name" />

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

              console.log(res);
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
