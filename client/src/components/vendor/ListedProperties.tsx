
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Home, MapPin, Calendar, Bed, Bath, Car, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PropertyListing from '@/pages/properties/PropertyListing';
import { PropertyFormData } from '@/components/property-listing/propertySchema';
import QRCodeGenerator from './QRCodeGenerator';

const ListedProperties = () => {
  const [properties, setProperties] = useState(() => 
    JSON.parse(localStorage.getItem('vendor_properties') || '[]')
  );
  const [editingProperty, setEditingProperty] = useState<PropertyFormData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [selectedPropertyForQR, setSelectedPropertyForQR] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (property: any) => {
    setEditingProperty({
      ...property,
      propertyId: property.id,
      amenities: property.amenities || []
    });
  };

  const handleEditComplete = () => {
    // Refresh properties list
    const updatedProperties = JSON.parse(localStorage.getItem('vendor_properties') || '[]');
    setProperties(updatedProperties);
    setEditingProperty(null);
  };

  const handleGenerateQR = (property: any) => {
    setSelectedPropertyForQR(property);
    setShowQRDialog(true);
  };

  const confirmDelete = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    if (propertyToDelete) {
      const updatedProperties = properties.filter((p: any) => p.id !== propertyToDelete);
      setProperties(updatedProperties);
      localStorage.setItem('vendor_properties', JSON.stringify(updatedProperties));
      
      toast({
        title: "Property Deleted",
        description: "The property has been permanently removed.",
        variant: "destructive"
      });
    }
    setShowDeleteDialog(false);
    setPropertyToDelete(null);
  };

  if (editingProperty) {
    return (
      <PropertyListing 
        editMode={true} 
        propertyData={editingProperty} 
        onEditComplete={handleEditComplete}
      />
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Listed Properties ({properties.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <div className="text-center py-8">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Properties Listed</h3>
            <p className="text-gray-500 mb-4">You haven't listed any properties yet.</p>
            <Button onClick={() => window.location.href = '/list-property'}>
              List Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property: any) => (
              <Card key={property.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{property.propertyTitle}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{property.propertyType}</Badge>
                        <Badge 
                          variant={property.status === 'Available' ? 'default' : 'secondary'}
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateQR(property)}
                        title="Generate QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(property)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => confirmDelete(property.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.address}, {property.city}, {property.state}</span>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    {property.beds > 0 && (
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.beds} Beds</span>
                      </div>
                    )}
                    {property.baths > 0 && (
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths} Baths</span>
                      </div>
                    )}
                    {property.garages > 0 && (
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        <span>{property.garages} Garage</span>
                      </div>
                    )}
                  </div>

                  {property.homeArea > 0 && (
                    <div className="text-sm text-gray-600">
                      Area: {property.homeArea} sq ft
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Built in {property.yearBuilt}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {property.propertyDescription}
                  </p>

                  {property.amenities && property.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* QR Code Generator Dialog */}
        {selectedPropertyForQR && (
          <QRCodeGenerator 
            property={selectedPropertyForQR}
            isOpen={showQRDialog}
            onClose={() => {
              setShowQRDialog(false);
              setSelectedPropertyForQR(null);
            }}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Property</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this property? This action cannot be undone and the property will be permanently removed from your listings.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Property
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
};

export default ListedProperties;
