import { ChangeEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Video, Upload, Trash2 } from "lucide-react";
import { resolveMediaUrl } from "@/lib/media";

interface MediaUploadStepProps {
  form: UseFormReturn<PropertyFormData>;
  imageFiles: File[];
  onImageFilesChange: (files: File[]) => void;
}

const MediaUploadStep = ({
  form,
  imageFiles,
  onImageFilesChange,
}: MediaUploadStepProps) => {
  const videos = form.watch("videos") || [];
  const existingImages = form.watch("images") || [];

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const deduped = [...imageFiles];
    const seen = new Set(deduped.map((file) => `${file.name}-${file.size}`));

    for (const file of files) {
      const key = `${file.name}-${file.size}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(file);
    }

    onImageFilesChange(deduped);
    event.target.value = "";
  };

  const removeUploadedImage = (index: number) => {
    const next = imageFiles.filter((_, fileIndex) => fileIndex !== index);
    onImageFilesChange(next);
  };

  const removeExistingImage = (value: string) => {
    const next = existingImages.filter((imagePath) => imagePath !== value);
    form.setValue("images", next, { shouldValidate: true, shouldDirty: true });
  };

  const addVideo = (value: string) => {
    const url = value.trim();
    if (!url || videos.includes(url)) return;
    form.setValue("videos", [...videos, url], { shouldValidate: true, shouldDirty: true });
  };

  const removeVideo = (idx: number) => {
    const next = videos.filter((_, i) => i !== idx);
    form.setValue("videos", next, { shouldValidate: true, shouldDirty: true });
  };

  const hasAnyImage = existingImages.length > 0 || imageFiles.length > 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">Media</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select property images now. We upload only after you submit the final form.
        </p>
      </div>

      <div className="space-y-4">
        <FormLabel className="text-foreground font-semibold text-lg">Property Images *</FormLabel>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/40 hover:bg-muted transition-colors">
          <Image className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground mb-4 font-medium">
            Upload JPG, PNG, or WEBP files (no SVG)
          </p>

          <Input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
            id="property-image-upload"
          />
          <Button
            type="button"
            onClick={() => document.getElementById("property-image-upload")?.click()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Images
          </Button>

          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="mt-3">
                {!hasAnyImage && (
                  <p className="text-sm text-destructive">At least one image is required</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {existingImages.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-foreground mb-2 font-semibold">Saved Images:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {existingImages.map((pathValue) => (
                <div
                  key={pathValue}
                  className="flex items-center justify-between gap-3 bg-card rounded-lg p-2 text-sm text-foreground font-medium border border-border"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={resolveMediaUrl(pathValue)}
                      alt="Property"
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />
                    <span className="truncate">{pathValue}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeExistingImage(pathValue)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {imageFiles.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-foreground mb-2 font-semibold">New Images:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {imageFiles.map((file, idx) => (
                <div
                  key={`${file.name}-${file.size}-${idx}`}
                  className="flex items-center justify-between bg-card rounded-lg p-2 text-sm text-foreground font-medium border border-border"
                >
                  <span className="truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeUploadedImage(idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* <div className="space-y-4">
        <FormLabel className="text-foreground font-semibold text-lg">
          Property Videos (URLs, optional)
        </FormLabel>
        <VideoInput onAdd={addVideo} />
        {videos.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-foreground mb-2 font-semibold">Videos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {videos.map((url: string, idx: number) => (
                <div
                  key={`${url}-${idx}`}
                  className="flex items-center justify-between bg-card rounded-lg p-2 text-sm text-foreground font-medium border border-border"
                >
                  <span className="truncate">{url}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeVideo(idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

const VideoInput = ({ onAdd }: { onAdd: (value: string) => void }) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleAdd = () => {
    onAdd(videoUrl);
    setVideoUrl("");
  };

  return (
    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/40 hover:bg-muted transition-colors">
      <Video className="w-12 h-12 text-primary mx-auto mb-4" />
      <p className="text-muted-foreground mb-4 font-medium">Add video tour URLs if available</p>

      <div className="flex gap-2 items-center justify-center">
        <Input
          placeholder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="max-w-lg bg-card border-border text-foreground placeholder:text-muted-foreground focus:bg-card focus:border-primary rounded-xl"
        />
        <Button
          type="button"
          onClick={handleAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>
    </div>
  );
};

export default MediaUploadStep;
