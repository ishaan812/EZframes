import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAccount } from "wagmi";
import { createJourney } from "~~/services/frames";
import { notification } from "~~/utils/scaffold-eth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { address } = useAccount();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleClose = () => {
    setImageUrl("");
    setProductName("");
    setProductDescription("");
    onClose();
  };

  const handleAddJourney = async () => {
    const newProduct = await createJourney({
      name: productName,
      desc: productDescription,
      image: imageUrl,
      walletAddress: address as string,
    });

    notification.success("Frame created successfully");
    // @ts-ignore
    router.push(`/dashboard/${newProduct._id}`);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">New Frame</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Description"
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          className="bg-gray-100"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" className="text-gray-500 hover:text-gray-600">
          Cancel
        </Button>
        <Button
          onClick={handleAddJourney}
          color="primary"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
