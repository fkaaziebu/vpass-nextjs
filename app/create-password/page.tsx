import CreatePasswordForm from "@/components/CreatePasswordForm";
import Modal from "@/components/Modal";

const CreatePassword = () => {
  return (
    <Modal>
      <CreatePasswordForm type="create" />
    </Modal>
  );
};

export default CreatePassword;
