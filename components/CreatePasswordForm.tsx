"use client";
import { FormEventHandler, useState } from "react";
import FormField from "./FormField";
import { Folders, Types } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type: string;
};

const CreatePasswordForm = ({ type }: Props) => {
  const [form, setForm] = useState({
    type: "Logins",
    name: "",
    folder: "No Folder",
    username: "",
    password: "",
    uri: "",
    note: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(form);
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="my-5">
        <FormField
          title="Name"
          placeholder="Name"
          state={form.name}
          setState={(value) => handleStateChange("name", value)}
        />
      </div>

      <div className="flex justify-between my-5">
        <CustomMenu
          title="Type"
          state={form.type}
          filters={Types}
          setState={(value) => handleStateChange("type", value)}
        />
        <div className="p-1"></div>
        <CustomMenu
          title="Folder"
          state={form.folder}
          filters={Folders}
          setState={(value) => handleStateChange("folder", value)}
        />
      </div>

      <div className="flex justify-between my-5">
        <FormField
          title="Username"
          placeholder="Username"
          state={form.username}
          setState={(value) => handleStateChange("username", value)}
        />
        <div className="p-1"></div>
        <FormField
          title="Password"
          placeholder="Password"
          state={form.password}
          setState={(value) => handleStateChange("password", value)}
        />
      </div>

      <div className="my-5">
        <FormField
          type="url"
          title="URI"
          placeholder="https://www.github.com/fkaaziebu"
          state={form.uri}
          setState={(value) => handleStateChange("uri", value)}
        />
      </div>

      <div className="my-5">
        <FormField
          title="Notes"
          placeholder="Write Notes"
          state={form.note}
          setState={(value) => handleStateChange("note", value)}
          isTextArea={true}
        />
      </div>

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default CreatePasswordForm;
