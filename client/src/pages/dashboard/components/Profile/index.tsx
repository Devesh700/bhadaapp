import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User,  
  Building, 
  Camera, 
  Save,
  Crown,
  Settings,
  Shield
} from "lucide-react";
import Personal from './Personal.Tab';
import Contact from './Contact.Tab';
import Preferences from './Preferences.Tab';
import Security from './Security.Tab';
import { profileController } from './profile.controller';
import RoleUpgradeForm from './RoleUpgradeForm';



interface ProfileTabProps {
  userData: any;
  onProfileUpdate: (updatedData: any) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData, onProfileUpdate }) => {
  
  const {getCompletionPercentage,handleRoleUpgradeSubmit, handleProfileSubmit, roleUpgradeForm, roleUpgradeSchema, profileForm, profileSchema, activeProfileTab, setActiveProfileTab, isEditing, setIsEditing, showRoleUpgrade, setShowRoleUpgrade, profilePictureUrl, setProfilePictureUrl, toast } = profileController(userData, onProfileUpdate);

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
                  onClick={profileForm.handleSubmit(handleProfileSubmit, (error)=> console.error(error))}
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

            <Personal userData={userData} profileForm={profileForm} isEditing={isEditing}/>

            <Contact userData={userData} isEditing={isEditing} profileForm = {profileForm}/>

            <Preferences/>

            <Security userData={userData}/>
          </Tabs>
        </CardContent>
      </Card>

      {/* Role Upgrade Modal */}
      {showRoleUpgrade && (
        <RoleUpgradeForm setShowRoleUpgrade={setShowRoleUpgrade} roleUpgradeForm={roleUpgradeForm} handleRoleUpgradeSubmit={handleRoleUpgradeSubmit}/>
      )}
    </div>
  );
};

export default ProfileTab;
