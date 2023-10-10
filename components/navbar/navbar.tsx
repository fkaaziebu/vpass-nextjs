import { Plus } from "lucide-react";
import { AddItemButton } from "./add-item-button";

interface NavbarProps {
  isMasterVerified: boolean;
  isMasterPassword: boolean;
  isMasterExpired: boolean;
}

export const Navbar = ({
  isMasterPassword,
  isMasterVerified,
  isMasterExpired,
}: NavbarProps) => {
  return (
    <div className="flex justify-between w-full p-2">
      <div className="hidden md:flex">
        <h1 className="text-3xl">Your Vault</h1>
      </div>
      <div className="flex space-x-4">
        {(isMasterPassword && isMasterVerified && !isMasterExpired) && (
          <AddItemButton
            iconType="eraser"
            description="Clear Master"
            type="clearMasterPassword"
            isMasterPassword={isMasterPassword}
            isMasterVerified={isMasterVerified}
            isMasterExpired={isMasterExpired}
          />
        )}

        {(!isMasterPassword || isMasterExpired) && (
          <AddItemButton
            iconType="pen"
            description="Generate Master"
            type="createMasterPassword"
            isMasterPassword={isMasterPassword}
            isMasterVerified={isMasterVerified}
            isMasterExpired={isMasterExpired}
          />
        )}

        {(isMasterPassword && !isMasterVerified && !isMasterExpired) && (
          <AddItemButton
            iconType="pen"
            description="Verify Master"
            type="verifyMasterPassword"
            isMasterPassword={isMasterPassword}
            isMasterVerified={isMasterVerified}
            isMasterExpired={isMasterExpired}
          />
        )}

        <AddItemButton
          iconType="plus"
          description="Add Password"
          type="createPassword"
          isMasterPassword={isMasterPassword}
          isMasterVerified={isMasterVerified}
          isMasterExpired={isMasterExpired}
        />
      </div>
    </div>
  );
};
