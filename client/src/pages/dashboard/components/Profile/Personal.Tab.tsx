import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
export default function Personal({userData, isEditing, profileForm}) {
    return (
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
    )
} 