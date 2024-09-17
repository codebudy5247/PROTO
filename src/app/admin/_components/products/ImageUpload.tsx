import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Control, useController } from "react-hook-form";

interface ImageUploadProps {
  control: Control<any>;
  name: string;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ control, name, label }) => {
  const { field, fieldState } = useController({ control, name });

  const images:string[] = field.value || [];

  const handleImageUpload = (res: any) => {
    field.onChange([...images, res[0].url]);
  };

  const handleUploadError = (error: Error) => {
    toast.error(error.message);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Card>
        <CardContent className="mt-2 min-h-48 space-y-2">
          <div className="flex-start space-x-2">
            <div className="flex items-center gap-2">
              {images.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt="product image"
                  className="h-20 w-20 rounded-sm object-cover object-center"
                  width={100}
                  height={100}
                />
              ))}
            </div>

            <FormControl>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleImageUpload}
                onUploadError={handleUploadError}
              />
            </FormControl>
          </div>
        </CardContent>
      </Card>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </FormItem>
  );
};

export default ImageUpload;
