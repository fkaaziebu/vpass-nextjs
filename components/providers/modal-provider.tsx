"use client";

import { useEffect, useState } from "react";

import { CreatePasswordModal } from "@/components/modals/create-password-modal";
import { CreateMasterPasswordModal } from "@/components/modals/create-master-password-modal";
import { DeletePasswordModal } from "@/components/modals/delete-password-modal";
import { ViewPasswordModal } from "@/components/modals/view-password-modal";
import { ClearMasterPasswordModal } from "../modals/clear-master-password-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreatePasswordModal />
      <CreateMasterPasswordModal />
      <DeletePasswordModal />
      <ViewPasswordModal />
      <ClearMasterPasswordModal />
    </>
  );
};
