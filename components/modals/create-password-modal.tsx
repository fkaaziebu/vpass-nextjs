"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "@/components/ui/separator";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { generateString } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  description: z.string().min(3, {
    message: "Description must be atleast 3 characters long",
  }),
  password: z.string().min(4, {
    message: "Password must be atleast 4 characters long",
  }),
  length: z
    .number()
    .min(4, {
      message: "Must be of value 4 or more",
    })
    .max(32, {
      message: "Must be of value 32 or less",
    }),
  numeric: z.boolean(),
  uppercase: z.boolean(),
  lowercase: z.boolean(),
  symbols: z.boolean(),
});

export const CreatePasswordModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type == "createPassword";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      password: "",
      length: 4,
      numeric: true,
      uppercase: false,
      lowercase: false,
      symbols: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { description, password } = values;

      await axios.post("/api/create-password", {
        description,
        password,
      });

      toast.success("Password created successfully");

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error(
        "Something went wrong while creating password, please try again later"
      );
    }
  };

  const generatePass = (form: UseFormReturn) => {
    const { length, numeric, lowercase, uppercase, symbols } = form.getValues();
    form.setValue(
      "password",
      generateString(length, { numeric, lowercase, uppercase, symbols })
    );
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Password
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter password description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Click Generate Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                        Length
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[4]}
                          onValueChange={(e) => field.onChange(e[0])}
                          max={32}
                          step={1}
                          disabled={isLoading}
                          id="length"
                        />
                      </FormControl>
                      <p className="border rounded-md p-1">{field.value}</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeric"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        id="numeric"
                      />
                    </FormControl>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Include numbers
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uppercase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        id="uppercase"
                      />
                    </FormControl>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Include uppercase
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowercase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        id="lowercase"
                      />
                    </FormControl>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Include lowercase
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="symbols"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        id="symbols"
                      />
                    </FormControl>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Include symbols
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="px-6 py-4">
              <Button
                onClick={() => generatePass(form as any)}
                type="button"
                variant="secondary"
                disabled={
                  isLoading ||
                  form.getValues("lowercase") === false &&
                  form.getValues("uppercase") === false &&
                  form.getValues("numeric") === false &&
                  form.getValues("symbols") === false
                }
              >
                Generate Password
              </Button>
              <Button variant="default" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
