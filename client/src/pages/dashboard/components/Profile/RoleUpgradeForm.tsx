import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Crown } from "lucide-react";
import { Form } from "react-router-dom";

export default function RoleUpgradeForm({roleUpgradeForm, handleRoleUpgradeSubmit, setShowRoleUpgrade}) {
    return (
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
    )
}