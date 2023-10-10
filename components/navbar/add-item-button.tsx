"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Plus, Eye, Trash, PenSquare, BadgePlus, Eraser } from "lucide-react";

interface AddItemButtonProps {
  type:
    | "createPassword"
    | "createMasterPassword"
    | "deletePassword"
    | "viewPassword"
    | "clearMasterPassword"
    | "verifyMasterPassword";
  description?: string;
  iconType?: "plus" | "eye" | "trash" | "pen" | "badge" | "eraser";
  password?: {
    id: string;
    description: string;
    password: string;
    profileId: string;
    createdAt: any;
    updatedAt: any;
  };
  isMasterPassword: boolean;
  isMasterVerified: boolean;
  isMasterExpired: boolean;
}

export const AddItemButton = ({
  type,
  description,
  iconType,
  password,
  isMasterPassword,
  isMasterVerified,
  isMasterExpired,
}: AddItemButtonProps) => {
  const { onOpen } = useModal();

  const onClick = () => {
    if (!isMasterPassword && type !== "createPassword") {
      type = "createMasterPassword";
    } else if (!isMasterVerified) {
      type = "verifyMasterPassword";
    } 
    
    if (isMasterExpired) {
      type = "createMasterPassword";
    }

    onOpen(type, { password });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center hover:bg-zinc-700/10 transition bg-zinc-700/20",
        description && "gap-x-2",
        iconType === "trash" && "bg-red-600 hover:bg-red-600/80",
        iconType === "eye" && "bg-[#3498db] hover:bg-[#3498db]/80"
      )}
      type="button"
    >
      {iconType === "plus" && (
        <Plus className="flex-shrink-0 w-5 h-5 text-zinc-500" />
      )}
      {iconType === "pen" && (
        <PenSquare className="flex-shrink-0 w-5 h-5 text-zinc-500" />
      )}
      {iconType === "badge" && (
        <BadgePlus className="flex-shrink-0 w-5 h-5 text-zinc-500" />
      )}

      {iconType === "eraser" && (
        <Eraser className="flex-shrink-0 w-5 h-5 text-zinc-500" />
      )}

      {iconType === "eye" && (
        <Eye className="flex-shrink-0 w-5 h-5 text-white" />
      )}
      {iconType === "trash" && (
        <Trash className="flex-shrink-0 w-5 h-5 text-white" />
      )}

      <p>{description}</p>
    </button>
  );
};
