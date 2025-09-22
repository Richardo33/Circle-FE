import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/authSlice";

const BASE_URL = "http://localhost:3000";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultValues: {
    profile_picture: string | null;
    backgroundPhoto: string | null;
  };
}

function EditProfilePhotoDialog({ open, onClose, defaultValues }: Props) {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [backgroundPic, setBackgroundPic] = useState<File | null>(null);
  const dispatch = useDispatch();

  const profilePreview = profilePic
    ? URL.createObjectURL(profilePic)
    : defaultValues.profile_picture
    ? `${BASE_URL}${defaultValues.profile_picture}`
    : null;

  const backgroundPreview = backgroundPic
    ? URL.createObjectURL(backgroundPic)
    : defaultValues.backgroundPhoto
    ? `${BASE_URL}${defaultValues.backgroundPhoto}`
    : "https://picsum.photos/1200/400";

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (profilePic) formData.append("profileImage", profilePic);
      if (backgroundPic) formData.append("backgroundPhoto", backgroundPic);

      const res = await axios.put(`${BASE_URL}/api/v1/auth/me`, formData, {
        withCredentials: true,
      });

      const updatedUser = res.data.data;

      dispatch(
        updateUser({
          profile_picture: updatedUser.profile_picture,
          backgroundPhoto: updatedUser.backgroundPhoto,
        })
      );

      onClose();
    } catch (err) {
      console.error("Failed to update profile photos:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#1D1D1D]">
        <DialogClose className="absolute top-3 right-3 text-white text-xl font-bold hover:text-gray-300">
          ×
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Edit Photos</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <img
              src={backgroundPreview}
              alt="Background"
              className="w-full h-32 object-cover rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="background-upload"
              onChange={(e) => setBackgroundPic(e.target.files?.[0] ?? null)}
            />
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2 bg-black/60 text-white hover:bg-black/80"
              onClick={() =>
                document.getElementById("background-upload")?.click()
              }
            >
              Change Background
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
                onChange={(e) => setProfilePic(e.target.files?.[0] ?? null)}
              />
              <Button
                size="sm"
                variant="secondary"
                className="bg-green-600 text-white hover:bg-green-500"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                Change Avatar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 ">
          <Button
            onClick={handleSave}
            className="bg-green-600 text-white hover:bg-green-500"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfilePhotoDialog;
