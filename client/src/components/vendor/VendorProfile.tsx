
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface VendorData {
  isLoggedIn: boolean;
  email: string;
  fullName: string;
  role: string;
}

interface VendorProfileProps {
  vendorData: VendorData;
}

const VendorProfile = ({ vendorData }: VendorProfileProps) => {
  const [profile, setProfile] = useState({
    fullName: vendorData.fullName,
    email: vendorData.email,
    phone: '',
    address: '',
    bio: '',
    company: '',
  });
  const { toast } = useToast();

  const handleSave = () => {
    // Update vendor auth data
    const updatedVendorData = {
      ...vendorData,
      fullName: profile.fullName,
      email: profile.email,
    };
    
    localStorage.setItem('vendor_auth', JSON.stringify(updatedVendorData));
    localStorage.setItem('vendor_profile', JSON.stringify(profile));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 9876543210"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Your company name"
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={profile.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Your business address"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Tell us about yourself and your business..."
            rows={4}
            className="mt-1"
          />
        </div>
        
        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Profile
        </Button>
      </CardContent>
    </>
  );
};

export default VendorProfile;
