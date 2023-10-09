"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const DeletePasswordModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type == "deletePassword";

  const { password } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/delete-password/${password?.id}`);

      toast.success("Password has been deleted")
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong while deleting password, please try again later")
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Confirm Password Delete
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          This Password would be permanently deleted
        </div>
        <DialogFooter className="px-6 py-4">
          <Button
            onClick={onClick}
            type="button"
            variant="default"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-600/80"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
