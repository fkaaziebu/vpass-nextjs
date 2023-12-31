import { create } from "zustand";

export type ModalType =
  | "createPassword"
  | "createMasterPassword"
  | "deletePassword"
  | "viewPassword"
  | "clearMasterPassword"
  | "verifyMasterPassword";

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

interface ModalData {
  password?: {
    id: string;
    description: string;
    password: string;
    profileId: string;
    createdAt: any;
    updatedAt: any;
  };
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));
