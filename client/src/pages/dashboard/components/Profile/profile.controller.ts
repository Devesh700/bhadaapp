import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks/redux";
import { getUserProfile, updateUserProfile, upgradeRole } from "@/store/thunks/user.thunk";
import { IUser } from "@/store/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
export const profileController = (userData:IUser, onProfileUpdate) =>{
    // Profile form schema
const profileSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
  profile: z.object({
    firstName: z.string().min(1, "First name is required"),
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

const [activeProfileTab, setActiveProfileTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showRoleUpgrade, setShowRoleUpgrade] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(userData?.profilePicture || "");
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUserProfile());
  },[dispatch])

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
      
      dispatch(updateUserProfile(data))
      
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
      const response = await dispatch(upgradeRole(data))
      console.log("Upgrade response:", response);
      
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

  return {getCompletionPercentage,handleRoleUpgradeSubmit, handleProfileSubmit, roleUpgradeForm, roleUpgradeSchema, profileForm, profileSchema, activeProfileTab, setActiveProfileTab, isEditing, setIsEditing, showRoleUpgrade, setShowRoleUpgrade, profilePictureUrl, setProfilePictureUrl, toast }
}