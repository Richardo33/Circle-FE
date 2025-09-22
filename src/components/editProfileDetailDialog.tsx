import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/authSlice";

interface ProfileData {
  full_name: string;
  username: string;
  email: string;
  bio: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  defaultValues: ProfileData;
  onSave?: (updatedProfile: ProfileData) => void;
}

function EditProfileDetailsDialog({
  open,
  onClose,
  defaultValues,
  onSave,
}: Props) {
  const [form, setForm] = useState(defaultValues);
  const [, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(defaultValues);
    setError(null);
  }, [defaultValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // reset error saat user mengetik
  };

  const validateUsername = (username: string) => {
    if (username.includes(" ")) return "Username tidak boleh ada spasi";
    if (username.length > 20) return "Username maksimal 20 karakter";
    return null;
  };

  const handleSave = async () => {
    const usernameError = validateUsername(form.username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/auth/me",
        form,
        { withCredentials: true }
      );

      const updatedUser = res.data.data;

      dispatch(
        updateUser({
          full_name: updatedUser.full_name,
          username: updatedUser.username,
          email: updatedUser.email,
          bio: updatedUser.bio,
        })
      );

      if (onSave) onSave(updatedUser);
      onClose();
    } catch (err) {
      console.error("Failed to update profile details:", err);
    }
  };

  const usernameError = validateUsername(form.username);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D1D1D] max-w-lg">
        <DialogClose className="absolute top-3 right-3 text-white text-xl font-bold hover:text-gray-300">
          ×
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            Edit Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Input
            name="full_name"
            className="text-white placeholder-gray-400"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <Input
            name="username"
            className="text-white placeholder-gray-400"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
          />
          {usernameError && (
            <p className="text-red-500 text-sm">{usernameError}</p>
          )}

          <Input
            name="email"
            className="text-white placeholder-gray-400"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Textarea
            name="bio"
            className="text-white placeholder-gray-400"
            value={form.bio ?? ""}
            onChange={handleChange}
            placeholder="Bio"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSave}
            disabled={!!usernameError}
            className={`bg-green-600 text-white hover:bg-green-500 ${
              usernameError ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDetailsDialog;
