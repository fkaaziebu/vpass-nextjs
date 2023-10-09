"use client";

import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

export const ViewPasswordModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [descriptionDisplayed, setDescriptionDisplayed] = useState("");
  const [passwordDisplayed, setPasswordDisplayed] = useState("");

  const isModalOpen = isOpen && type == "viewPassword";

  const { password } = data;
  // @ts-ignore
  const copiedPassword = password?.password;
  const onCopy = () => {
    // @ts-ignore
    navigator.clipboard.writeText(copiedPassword);
    setCopied(true);
    toast.success("Password copied!");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (password) {
      setDescriptionDisplayed(password.description);
      setPasswordDisplayed(password.password);
    }
  }, [password]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            View Password
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6 mb-6">
          <div className="uppercase text-xs font-bold text-zinc-500">
            Description
          </div>
          <div>
            <Input
              value={descriptionDisplayed}
              disabled
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              placeholder="Password Description"
            />
          </div>

          <div className="uppercase text-xs font-bold text-zinc-500">
            Password
          </div>
          <div className="flex gap-x-2">
            <Input
              value={passwordDisplayed}
              disabled
              className="text-black bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Password"
            />
            <Button
              type="button"
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
