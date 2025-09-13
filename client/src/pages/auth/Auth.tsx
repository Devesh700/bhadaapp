// // src/components/auth/Auth.tsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import Layout from "@/components/layout/Layout";

// // Redux imports
// import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
// import { clearError } from "@/store/slices/auth.slice";
// import { selectIsAuthenticated } from "@/store/selectors/auth.selector";

// // Component imports
// import Login from "./Login";
// import Register from "./Register";

// const Auth = () => {
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");
//   const [userType, setUserType] = useState<"user" | "owner" | "admin">("user");
  
//   // Redux hooks
//   const dispatch = useAppDispatch();
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const navigate = useNavigate();

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleModeSwitch = (newMode: "login" | "register") => {
//     setAuthMode(newMode);
//     // Clear any existing errors when switching modes
//     dispatch(clearError());
//   };

//   const handleAuthSuccess = () => {
//     navigate("/dashboard");
//   };

//   return (
//       <div className="container mx-auto px-4 py-8 max-w-md ">
//         <Card className="w-full border-0">
//           {/* <CardHeader className="text-center">
//             <CardTitle className="text-2xl">
//               {authMode === "login" ? "Login to" : "Join"} <span className="text-bhada-blue">Bhada</span><span className="text-bhada-orange">.in</span>
//             </CardTitle>
//             <CardDescription>
//               {authMode === "login" ? "Welcome back!" : "Create a new account"}
//             </CardDescription>
//           </CardHeader> */}
//           <CardContent>
//             {/* User Type Selector - Only show for registration */}
//             {authMode === "register" && (
//               <Tabs 
//                 defaultValue={userType} 
//                 onValueChange={(value) => setUserType(value as "user" | "owner" | "admin")}
//                 className="w-full mb-6"
//               >
//                 <TabsList className="grid w-full grid-cols-3">
//                   <TabsTrigger value="user">User</TabsTrigger>
//                   <TabsTrigger value="owner">Owner</TabsTrigger>
//                   <TabsTrigger value="admin">Admin</TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             )}

//             {/* Render Login or Register Component */}
//             {authMode === "login" ? (
//               <Login onSuccess={handleAuthSuccess} />
//             ) : (
//               <Register userType={userType} onSuccess={handleAuthSuccess} />
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <p>
//               {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
//               <Button 
//                 variant="link" 
//                 className="p-0" 
//                 onClick={() => handleModeSwitch(authMode === "login" ? "register" : "login")}
//               >
//                 {authMode === "login" ? "Register" : "Login"}
//               </Button>
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//   );
// };

// export default Auth;



// src/components/auth/Auth.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { selectIsAuthenticated } from "@/store/selectors/auth.selector";
import EmailAuth from "./components/EmailAuth";
import GoogleAuth from "./components/GoogleAuth";
import { hideAuthModal } from "@/store/slices/partials.slice";

const Auth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleAuthSuccess = () => {
    dispatch(hideAuthModal())
    navigate("/dashboard");
    
  };

  return (

      <Card className="w-full border-0 ">
        <CardContent className="">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="text-blue-600">Bhada</span>
              <span className="text-orange-500">.in</span>
            </h1>
            <p className="text-gray-600">Sign in or create an account instantly</p>
          </div>

          <div className="space-y-6">
            {/* Email Authentication */}
            <EmailAuth onSuccess={handleAuthSuccess} />
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Google Authentication */}
            <GoogleAuth onSuccess={handleAuthSuccess} />
          </div>
        </CardContent>
      </Card>
  );
};

export default Auth;
