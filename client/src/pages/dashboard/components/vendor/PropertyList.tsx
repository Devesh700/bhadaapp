import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getMyProperties } from "@/store/thunks/property.thunk";
import { Building, MapPin, Plus, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stat } from "fs";

const PropertyList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data:properties, status } = useAppSelector((state) => state.property.properties);
    const loading = useMemo(() => status === 1 ,[status]);
  useEffect(() => {
    dispatch(getMyProperties({}));
  }, [dispatch]);

  return (
    <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Building className="w-6 h-6" />
            Your Properties
          </span>
          <Button
            onClick={() => navigate("/create-property")}
            className="bg-white text-indigo-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            <Plus className="mr-2" size={16} />
            Add Property
          </Button>
        </CardTitle>
        <CardDescription className="text-indigo-100">
          Manage all your property listings in one place
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500 animate-pulse">
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-28 h-28 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Building className="w-14 h-14 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Properties Listed
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start growing your property business by adding your first listing.
            </p>
            <Button
              onClick={() => navigate("/create-property")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <Plus className="mr-2" size={18} />
              List Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index: number) => (
              <Card
                key={property._id || index}
                className="border border-blue-100 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 rounded-xl overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Building className="w-10 h-10 text-blue-600" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {property.title}
                    </h4>
                    <span className="flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      <Tag className="w-3 h-3 mr-1" />
                      {property.propertyType || "Listed"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {property.location.city}, {property.location.state}
                  </p>

                  <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    ₹{property.price?.toLocaleString() || "N/A"}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-md"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={()=> navigate(`/properties/${property._id}`)}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyList;
