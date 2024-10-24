"use client";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { SingleImageDropzone } from "./dropimage";
import { BACKEND_URL } from "@/lib/constant";

interface EditProfileDialogProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  backendtoken: string;
}

const EditProfileDialog = ({ user, backendtoken }: EditProfileDialogProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    setName(user.name);
  }, [user]);

  const handleSave = async () => {
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        const imglink = res.url;

         await fetch(`${BACKEND_URL}/user/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${backendtoken}`,
          },
          body: JSON.stringify({
            name: name,
            image: imglink,
          }),
        });
        setSuccess(true);
      } else {
        const res = await fetch(`${BACKEND_URL}/user/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${backendtoken}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        });

        if (res.ok) {
          setSuccess(true);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(true);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [success, error]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil size={24} className="text-green-400 hover:text-green-600" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Edit Profile </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center items-center">
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
              <LinearProgress variant="determinate" value={progress} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <div>
              {success && (
                <p className="text-green-500 text-sm mb-2">Profile updated!</p>
              )}
              {error && (
                <p className="text-red-500 text-sm mb-2">
                  Error updating profile
                </p>
              )}
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
