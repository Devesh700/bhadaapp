// src/components/dashboard/ProfileTab.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Camera, 
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Crown,
  Settings,
  Shield
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/hooks/redux";

// Profile form schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  profile: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    occupation: z.string().optional(),
    companyName: z.string().optional(),
    bio: z.string().optional(),
  }),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.object({
    street: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Pincode must be 6 digits"),
    country: z.string().optional(),
    landmark: z.string().optional(),
  }),
});

// Role upgrade schema
const roleUpgradeSchema = z.object({
  businessDetails: z.object({
    businessName: z.string().min(2, "Business name is required"),
    businessType: z.string().min(1, "Business type is required"),
    licenseNumber: z.string().optional(),
    gstNumber: z.string().optional(),
    panNumber: z.string().optional(),
    experienceYears: z.number().min(0).optional(),
    specialization: z.array(z.string()).optional(),
    serviceAreas: z.array(z.string()).optional(),
    businessAddress: z.object({
      street: z.string().optional(),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      pincode: z.string().min(6, "Pincode is required"),
    }),
  }),
  additionalInfo: z.string().optional(),
});

interface ProfileTabProps {
  userData: any;
  onProfileUpdate: (updatedData: any) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData, onProfileUpdate }) => {
  const [activeProfileTab, setActiveProfileTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showRoleUpgrade, setShowRoleUpgrade] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(userData?.profilePicture || "");
  const { toast } = useToast();

  // Profile form
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name || "",
      profile: {
        firstName: userData?.profile?.firstName || "",
        lastName: userData?.profile?.lastName || "",
        dateOfBirth: userData?.profile?.dateOfBirth ? 
          new Date(userData.profile.dateOfBirth).toISOString().split('T')[0] : "",
        gender: userData?.profile?.gender || "",
        occupation: userData?.profile?.occupation || "",
        companyName: userData?.profile?.companyName || "",
        bio: userData?.profile?.bio || "",
      },
      phone: userData?.phone || "",
      address: {
        street: userData?.address?.street || "",
        city: userData?.address?.city || "",
        state: userData?.address?.state || "",
        pincode: userData?.address?.pincode || "",
        country: userData?.address?.country || "India",
        landmark: userData?.address?.landmark || "",
      },
    },
  });

  // Role upgrade form
  const roleUpgradeForm = useForm({
    resolver: zodResolver(roleUpgradeSchema),
    defaultValues: {
      businessDetails: {
        businessName: "",
        businessType: "",
        licenseNumber: "",
        gstNumber: "",
        panNumber: "",
        experienceYears: 0,
        specialization: [],
        serviceAreas: [],
        businessAddress: {
          street: "",
          city: "",
          state: "",
          pincode: "",
        },
      },
      additionalInfo: "",
    },
  });

  const handleProfileSubmit = async (data: any) => {
    try {
      // API call to update profile
      console.log("Updating profile:", data);
      
      toast({
        title: "Profile Updated! ✅",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
      onProfileUpdate(data);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRoleUpgradeSubmit = async (data: any) => {
    try {
      // API call to request role upgrade
      console.log("Requesting role upgrade:", data);
      
      toast({
        title: "Upgrade Request Submitted! 🚀",
        description: "Your vendor upgrade request has been submitted for review.",
      });
      
      setShowRoleUpgrade(false);
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Failed to submit upgrade request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCompletionPercentage = () => {
    const fields = [
      userData?.name,
      userData?.profile?.firstName,
      userData?.profile?.lastName,
      userData?.phone,
      userData?.address?.city,
      userData?.address?.state,
      userData?.profile?.occupation,
      userData?.profilePicture,
    ];
    
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {profilePictureUrl ? (
                <img 
                  src={profilePictureUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <User size={32} className="text-white" />
              )}
            </div>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
            >
              <Camera size={14} />
            </Button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{userData?.name || 'Complete Your Profile'}</h2>
            <p className="text-white/80 mb-4">{userData?.email}</p>
            
            <div className="flex items-center gap-4">
              <Badge variant={userData?.role === 'vendor' ? 'default' : 'secondary'} className="text-sm">
                {userData?.role === 'vendor' && <Crown className="w-4 h-4 mr-1" />}
                {userData?.role?.toUpperCase()}
              </Badge>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>{getCompletionPercentage()}% Complete</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={profileForm.handleSubmit(handleProfileSubmit)}
                  className="bg-white text-purple-600 hover:bg-white/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Upgrade Section */}
      {userData?.role === 'user' && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Crown className="w-5 h-5" />
              Upgrade to Vendor Account
            </CardTitle>
            <CardDescription>
              Unlock advanced features and start listing your properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Building className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800">List Properties</h4>
                <p className="text-sm text-gray-600">Add unlimited properties</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Verified Badge</h4>
                <p className="text-sm text-gray-600">Gain customer trust</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Analytics</h4>
                <p className="text-sm text-gray-600">Track your performance</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowRoleUpgrade(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              <Crown className="w-4 h-4 mr-2" />
              Apply for Vendor Account
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Profile Details Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeProfileTab} onValueChange={setActiveProfileTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Form {...profileForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="profile.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="profile.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="profile.dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            {...field} 
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="profile.gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                          disabled={!isEditing}
                        >
                          <FormControl>
                            <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="profile.occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="profile.companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <FormField
                      control={profileForm.control}
                      name="profile.bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              disabled={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Form {...profileForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Contact Information
                    </h3>
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">Email Address</span>
                        <Badge variant="outline" className="text-xs">
                          {userData?.isEmailVerified ? (
                            <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                          ) : (
                            <><AlertCircle className="w-3 h-3 mr-1" />Unverified</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{userData?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Address
                    </h3>
                    
                    <FormField
                      control={profileForm.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="address.pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates via SMS</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Marketing Communications</h4>
                        <p className="text-sm text-gray-600">Receive promotional content</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Show Phone Number</h4>
                        <p className="text-sm text-gray-600">Make your phone visible to other users</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Show Email Address</h4>
                        <p className="text-sm text-gray-600">Make your email visible to other users</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Account Security</h3>
                  </div>
                  <p className="text-blue-700 text-sm">Your account is secured with modern encryption.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-600">
                        {userData?.hasPassword ? 'Password is set' : 'No password set'}
                      </p>
                    </div>
                    <Button variant="outline">
                      {userData?.hasPassword ? 'Change Password' : 'Set Password'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Login Sessions</h4>
                      <p className="text-sm text-gray-600">Manage your active sessions</p>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Role Upgrade Modal */}
      {showRoleUpgrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Apply for Vendor Account
              </CardTitle>
              <CardDescription>
                Please provide your business details to upgrade your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...roleUpgradeForm}>
                <form onSubmit={roleUpgradeForm.handleSubmit(handleRoleUpgradeSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={roleUpgradeForm.control}
                      name="businessDetails.businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={roleUpgradeForm.control}
                      name="businessDetails.businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                              <SelectItem value="property-owner">Property Owner</SelectItem>
                              <SelectItem value="builder">Builder</SelectItem>
                              <SelectItem value="broker">Broker</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={roleUpgradeForm.control}
                      name="businessDetails.licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={roleUpgradeForm.control}
                      name="businessDetails.experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Business Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={roleUpgradeForm.control}
                        name="businessDetails.businessAddress.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={roleUpgradeForm.control}
                        name="businessDetails.businessAddress.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={roleUpgradeForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={3}
                            placeholder="Tell us more about your business..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowRoleUpgrade(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
