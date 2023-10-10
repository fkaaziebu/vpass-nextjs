"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  password: z.string().min(1, {
    message:
      "Please paste the master password sent to your email in the field above",
  }),
});

export const VerifyMasterPasswordModal = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type == "verifyMasterPassword";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { password } = values;

      await axios.post("/api/verify-master", {
        password,
      });

      toast.success("Password verified successfully");

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error(
        "Something went wrong while verifying master password, please try again later"
      );
    }
  };

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/generate-master");

      toast.success("Master Password created successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong while creating master password, please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Verify Master Password
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Master Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Master Password Here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-rose-700">
                You can only view or delete passwords once you have verified your master password.
                Check your email for master password sent to you
              </p>
            </div>

            <DialogFooter className="px-6 py-4">
              <Button
                type="button"
                variant="secondary"
                disabled={loading}
                onClick={onClick}
              >
                Resend Master Password
              </Button>
              <Button variant="default" disabled={isLoading}>
                Verify
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
