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

export const CreateMasterPasswordModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type == "createMasterPassword";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/generate-master");

      toast.success("Master Password created successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong while creating master password, please try again later"
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
            Generate Master Password
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          Click Create to generate a master password to allow you view your
          password
        </div>
        <DialogFooter className="px-6 py-4">
          <Button
            onClick={onClick}
            type="button"
            variant="default"
            disabled={isLoading}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
