import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

export default function Security ({userData}) {
    return (
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
    )
}