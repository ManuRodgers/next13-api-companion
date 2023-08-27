'use client';

import { useIsServerSide } from '@/hooks/use-is-server-side';
import { useToast } from '@/hooks/use-toast';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

type ImageUploadProps = {
  src: string;
  setSrc: Dispatch<SetStateAction<string>>;
};

export const ImageUpload = ({ src, setSrc }: ImageUploadProps) => {
  const { toast } = useToast();
  const isServerSide = useIsServerSide();
  if (isServerSide) {
    return null;
  }
  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            setSrc(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          toast({
            description: error.message,
            duration: 3000,
            variant: 'destructive',
          });
        }}
      />
      <div className="flex flex-col items-center justify-center p-4 space-y-4 transition border-4 border-dashed rounded-lg border-primary/10 hover:opacity-75">
        <div className="relative w-40 h-40">
          <Image
            fill
            alt="Upload"
            src={src}
            sizes="(min-width: 640px) 640px, 100vw"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};
