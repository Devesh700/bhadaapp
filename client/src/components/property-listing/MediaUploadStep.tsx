
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from './propertySchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video } from 'lucide-react';
import { useState } from 'react';

interface MediaUploadStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const MediaUploadStep = ({ form }: MediaUploadStepProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(files);
    form.setValue('mediaFiles', files);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedVideo(file);
    form.setValue('videoFile', file);
  };

  return (
    <div className="space-y-8">
      {/* Image Upload */}
      <div className="space-y-4">
        <FormLabel className="text-gray-900 font-semibold text-lg">Property Images</FormLabel>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 mb-4 font-medium">Upload high-quality images of your property</p>
          <FormField
            control={form.control}
            name="mediaFiles"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 font-medium"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Images
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {selectedImages.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
            <p className="text-gray-900 mb-2 font-semibold">Selected Images:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="bg-gray-200 rounded p-2 text-sm text-gray-900 truncate font-medium">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div className="space-y-4">
        <FormLabel className="text-gray-900 font-semibold text-lg">Property Video (Optional)</FormLabel>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 mb-4 font-medium">Upload a video tour of your property</p>
          <FormField
            control={form.control}
            name="videoFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 font-medium"
                      onClick={() => document.getElementById('video-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Video
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {selectedVideo && (
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
            <p className="text-gray-900 mb-2 font-semibold">Selected Video:</p>
            <div className="bg-gray-200 rounded p-2 text-sm text-gray-900 font-medium">
              {selectedVideo.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUploadStep;
