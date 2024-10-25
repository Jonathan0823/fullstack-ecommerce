"use client";
import { SingleImageDropzone } from "@/app/components/dropimage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/lib/constant";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useSession } from "next-auth/react";
import { LinearProgress } from "@mui/material";

const UploadBanner = () => {
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const [file, setFile] = useState<{ [key: number]: File | undefined }>({});
  const [banners, setBanners] = useState<
    {
      id: number;
      image: string;
      url: string | number | readonly string[] | undefined;
    }[]
  >([]);
  const [link, setLink] = useState<string>("");

  const fetchBanner = async () => {
    const res = await fetch(`${BACKEND_URL}/banners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const sortedBanners = banners.sort((a, b) => a.id - b.id);

  const handleImageChange = (file?: File, bannerId?: number) => {
    setFile((prevFiles) => ({
      ...prevFiles,
      [bannerId as number]: file,
    }));
  };

  const handleEdit = async (banner: Banner) => {
    if (!session) return;
    try {
      let imageUrl = banner.image;

      if (file[banner.id]) {
        const resImg = await edgestore.publicFiles.upload({
          file: file[banner.id] as File,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        imageUrl = resImg.url;
      }

      const res = await fetch(`${BACKEND_URL}/banners/edit/${banner.id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session.backendTokens.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          url: link ? link : banner.url,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update banner");
      }

      const updatedBanner = await res.json();
      setBanners((prevBanners) =>
        prevBanners.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
      );
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  interface Banner {
    id: number;
    image: string;
    url: string | number | readonly string[] | undefined;
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div>
      {sortedBanners.map((banner: Banner) => (
        <div className="p-6 ml-10" key={banner.id}>
          <h1 className="font-bold text-xl mb-2">Banner {banner.id}</h1>
          <SingleImageDropzone
            width={800}
            height={300}
            value={
              file[banner.id]
                ? URL.createObjectURL(file[banner.id] as Blob)
                : banner.image
            }
            onChange={(file?: File) => handleImageChange(file, banner.id)}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 2,
            }}
            className="bg-white"
          />
          <LinearProgress
            variant="determinate"
            value={progress}
            className="w-1/2"
          />
          {success && (
            <p className="text-green-500">Banner updated successfully</p>
          )}
          <Input
            className="mt-4 bg-white w-1/3"
            placeholder="Link"
            defaultValue={banner.url}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            className="mt-4"
            type="button"
            onClick={() => handleEdit(banner)}
          >
            Save
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UploadBanner;
