import { Plus } from "lucide-react";
import { AddItemButton } from "./add-item-button";

interface NavbarProps {
  isMasterPassword: boolean;
}

export const Navbar = ({ isMasterPassword }: NavbarProps) => {
  return (
    <div className="flex justify-between w-full p-2">
      <div>
        <h1 className="text-3xl">Your Vault</h1>
      </div>
      <div className="flex space-x-4">
        {isMasterPassword && (
          <AddItemButton
            iconType="eraser"
            description="Clear Master"
            type="clearMasterPassword"
            isMasterPassword={isMasterPassword}
          />
        )}
        <AddItemButton
          iconType="pen"
          description={isMasterPassword ? "Update Master" : "Generate Master"}
          type="createMasterPassword"
          isMasterPassword={isMasterPassword}
        />
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
