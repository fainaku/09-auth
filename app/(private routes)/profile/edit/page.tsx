"use client";

import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? "");
      setUserEmail(user.email ?? "");
      setPhotoUrl(user.avatar ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updateUser = await updateMe({ username: userName });
      setUser(updateUser);

      navigateBack();
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  const navigateBack = () => router.push("/profile");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <AvatarPicker profilePhotoUrl={photoUrl} />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={navigateBack}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
