"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

export const ClearMasterPasswordModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type == "clearMasterPassword";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete("/api/clear-master");

      toast.success("Password cleared successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong while clearing master password, please try again later"
      );
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
            Clear Master Password
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          You are about to remove the master password from the database
        </div>
        <DialogFooter className="px-6 py-4">
          <Button
            onClick={onClick}
            type="button"
            variant="default"
            disabled={isLoading}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
