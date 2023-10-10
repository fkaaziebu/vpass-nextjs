"use client";

import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal-store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AddItemButton } from "./navbar/add-item-button";

interface PasswordListingProps {
  passwords: {
    id: string;
    description: string;
    password: string;
    profileId: string;
    createdAt: any;
    updatedAt: any;
  }[];
  isMasterPassword: boolean;
}

export const PasswordListing = ({
  passwords,
  isMasterPassword,
}: PasswordListingProps) => {
  const { onOpen } = useModal();

  useEffect(() => {
    if (!isMasterPassword) {
      onOpen("createMasterPassword");
    }
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent created passwords</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>
            <div className="hidden sm:flex">Date created</div>
          </TableHead>
          <TableHead>
            <div className="flex justify-end sm:justify-center mr-2 sm:mr-0">
              Actions
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {passwords.map((password) => (
          <TableRow key={password.id}>
            <TableCell>{password.description}</TableCell>
            <TableCell>
              <div className="hidden sm:flex">{`${password.createdAt}`}</div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2 justify-end sm:justify-center mr-2 sm:mr-0">
                <AddItemButton
                  iconType="eye"
                  type="viewPassword"
                  password={password}
                  isMasterPassword={isMasterPassword}
                />
                <AddItemButton
                  iconType="trash"
                  type="deletePassword"
                  password={password}
                  isMasterPassword={isMasterPassword}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
