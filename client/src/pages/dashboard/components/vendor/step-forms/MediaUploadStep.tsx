// MediaUploadStep.tsx
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Video, Upload, Trash2 } from "lucide-react";
import { useState } from "react";

interface MediaUploadStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const MediaUploadStep = ({ form }: MediaUploadStepProps) => {
  const images = form.watch("images") || [];
  const videos = form.watch("videos") || [];
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const addImage = () => {
    const url = imageUrl.trim();
    if (!url) return;
    form.setValue("images", [...images, url], { shouldValidate: true, shouldDirty: true });
    setImageUrl("");
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    form.setValue("images", next, { shouldValidate: true, shouldDirty: true });
  };

  const addVideo = () => {
    const url = videoUrl.trim();
    if (!url) return;
    form.setValue("videos", [...videos, url], { shouldValidate: true, shouldDirty: true });
    setVideoUrl("");
  };

  const removeVideo = (idx: number) => {
    const next = videos.filter((_, i) => i !== idx);
    form.setValue("videos", next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      {/* Images */}
      <div className="space-y-4">
        <FormLabel className="text-gray-900 font-semibold text-lg">Property Images (URLs) *</FormLabel>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 mb-4 font-medium">Add at least one image URL for the property</p>

          <div className="flex gap-2 items-center justify-center">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="max-w-lg bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addImage}
              className="bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 font-medium"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>

          {/* Bind to RHF for error display */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="mt-3">
                <FormControl>
                  <div />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {images.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
            <p className="text-gray-900 mb-2 font-semibold">Images:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {images.map((url: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-gray-200 rounded p-2 text-sm text-gray-900 font-medium">
                  <span className="truncate">{url}</span>
                  <Button type="button" variant="ghost" onClick={() => removeImage(idx)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Videos */}
      <div className="space-y-4">
        <FormLabel className="text-gray-900 font-semibold text-lg">Property Videos (URLs, optional)</FormLabel>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 mb-4 font-medium">Add video tour URLs if available</p>

          <div className="flex gap-2 items-center justify-center">
            <Input
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="max-w-lg bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addVideo}
              className="bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 font-medium"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>

          <FormField
            control={form.control}
            name="videos"
            render={() => (
              <FormItem className="mt-3">
                <FormControl>
                  <div />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {videos.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
            <p className="text-gray-900 mb-2 font-semibold">Videos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {videos.map((url: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-gray-200 rounded p-2 text-sm text-gray-900 font-medium">
                  <span className="truncate">{url}</span>
                  <Button type="button" variant="ghost" onClick={() => removeVideo(idx)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUploadStep;
