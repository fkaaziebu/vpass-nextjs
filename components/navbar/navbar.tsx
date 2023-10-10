import { Plus } from "lucide-react";
import { AddItemButton } from "./add-item-button";

interface NavbarProps {
  isMasterVerified: boolean;
  isMasterPassword: boolean;
}

export const Navbar = ({ isMasterPassword, isMasterVerified }: NavbarProps) => {
  return (
    <div className="flex justify-between w-full p-2">
      <div className="hidden md:flex">
        <h1 className="text-3xl">Your Vault</h1>
      </div>
      <div className="flex space-x-4">
        {isMasterPassword && isMasterVerified && (
          <AddItemButton
            iconType="eraser"
            description="Clear Master"
            type="clearMasterPassword"
            isMasterPassword={isMasterPassword}
          />
        )}

        {!isMasterPassword && (
          <AddItemButton
            iconType="pen"
            description="Generate Master"
            type="createMasterPassword"
            isMasterPassword={isMasterPassword}
          />
        )}

        {isMasterPassword && !isMasterVerified && (
          <AddItemButton
            iconType="pen"
            description="Verify Master"
            type="verifyMasterPassword"
            isMasterPassword={isMasterPassword}
          />
        )}

        <AddItemButton
          iconType="plus"
          description="Add Password"
          type="createPassword"
          isMasterPassword={isMasterPassword}
        />
      </div>
    </div>
  );
};
