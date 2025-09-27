
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import Auth from "@/pages/auth/Auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { selectAuthModalState } from "@/store/selectors/partial.selector";
import { hideAuthModal } from "@/store/slices/partials.slice";
import { selectUser } from "@/store/selectors/auth.selector";
import { getMe } from "@/store/thunks/auth.thunk";


interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "register";
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const showModal = useAppSelector(selectAuthModalState);
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch();
  const closeModal = () => {
     
    dispatch(hideAuthModal());
  }
  useEffect(()=> {
    if(!user){
      dispatch(getMe());
    }
  },[user])
  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md w-[95%] rounded-xl bg-white border border-gray-200">        
        <Auth/>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
