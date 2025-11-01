import css from "./ProfilePage.module.css";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile page",
  description:
    "View your profile, update personal information, and manage your account settings on NoteHub.",
  openGraph: {
    title: "Profile page",
    description:
      "View your profile, update personal information, and manage your account settings on NoteHub.",
    url: "https://09-auth-lilac-tau.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Illustration of creating a new note in NoteHub",
      },
    ],
  },
};

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p className={css.usernameWrapper}>Name: {user.username}</p>
          <p className={css.usernameWrapper}>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
