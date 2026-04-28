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
  const inputClass =
    "max-w-lg bg-white border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";

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
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Media</h3>
        <p className="text-sm text-slate-600 mt-1">Add image and video URLs to make listing more attractive.</p>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <FormLabel className="text-slate-900 font-semibold text-lg">Property Images (URLs) *</FormLabel>
        <div className="border-2 border-dashed border-cyan-200 rounded-xl p-8 text-center bg-cyan-50/40 hover:bg-cyan-50 transition-colors">
          <Image className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
          <p className="text-slate-700 mb-4 font-medium">Add at least one image URL for the property</p>

          <div className="flex gap-2 items-center justify-center">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
            />
            <Button
              type="button"
              onClick={addImage}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium"
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
          <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
            <p className="text-slate-900 mb-2 font-semibold">Images:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {images.map((url: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 text-sm text-slate-900 font-medium border border-cyan-100">
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
        <FormLabel className="text-slate-900 font-semibold text-lg">Property Videos (URLs, optional)</FormLabel>
        <div className="border-2 border-dashed border-cyan-200 rounded-xl p-8 text-center bg-cyan-50/40 hover:bg-cyan-50 transition-colors">
          <Video className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
          <p className="text-slate-700 mb-4 font-medium">Add video tour URLs if available</p>

          <div className="flex gap-2 items-center justify-center">
            <Input
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={inputClass}
            />
            <Button
              type="button"
              onClick={addVideo}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium"
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
          <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
            <p className="text-slate-900 mb-2 font-semibold">Videos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {videos.map((url: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 text-sm text-slate-900 font-medium border border-cyan-100">
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
