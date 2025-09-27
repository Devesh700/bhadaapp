import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UserCheck, UserX } from "lucide-react";
import {
  fetchRoleUpgradeRequests,
//   reviewRoleUpgradeRequest,
//   RoleUpgradeRequest,
} from "./roleUpgrade.controller";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { selectUpgradeRequests } from "@/store/selectors/user.selector";
import { IUpgradeRequest } from "@/store/types/user.type";
import { getUpgradeRequests, reviewRoleUpgradeRequest } from "@/store/thunks/user.thunk";
import { stat } from "fs";
import { PageLoader } from "@/components/ui/page-loader";

const RoleUpgradeRequests = () => {
    const {data, status, error} = useAppSelector(selectUpgradeRequests)
  const [requests, setRequests] = useState<IUpgradeRequest[]>(data || []);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const isLoading = useMemo(()=> (loading ?? status === 1), [status, loading])
    const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUpgradeRequests());
  }, []);

  useEffect(()=>{
     
    if(data)
    setRequests(data)
  },[data])

  useEffect(() => {
    setLoading(status === 1);
  },[status])

//   const loadRequests = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchRoleUpgradeRequests();
//       setRequests(data);
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleReview = async (id: string, action: "approve" | "reject", userId:string) => {
    try {
      setProcessingId(id);
      const payload = {requestId:id, action, notes:action === "reject" ? "Not sufficient info" : "Not Specified", userId}
      await dispatch(reviewRoleUpgradeRequest(payload));
      await dispatch(getUpgradeRequests());
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <PageLoader isLoading text="Upgrade Requests Loading"/>
    );
  }

  if (!requests.length) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-white/20">
        <UserCheck className="mx-auto mb-4 text-teal-600" size={32} />
        <p className="text-gray-500">No pending role upgrade requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {requests?.map((req) => (
        <Card
          key={req._id}
          className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {req.user.name} ({req.user.email})
            </CardTitle>
            <CardDescription>
              Requested Role:{" "}
              <span className="font-medium text-purple-600">{req.requestedRole}</span> on{" "}
              {new Date(req.requestedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Notes: {req.notes || "N/A"}</p>
              <p className="text-xs text-gray-500 mt-1">Status: {req.status}</p>
            </div>
            {req.status === "pending" && (
              <div className="flex gap-3">
                <Button
                  onClick={() => handleReview(req._id, "approve", req.userId)}
                  disabled={processingId === req._id}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  {processingId === req._id ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <UserCheck className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button
                  onClick={() => handleReview(req._id, "reject", req.userId)}
                  disabled={processingId === req._id}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
                >
                  {processingId === req._id ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <UserX className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleUpgradeRequests;
