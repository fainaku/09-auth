import Link from "next/link";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Application not found",
  openGraph: {
    title: "Not Found",
    description: "Application not found",
    url: "https://09-auth-lilac-tau.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "note title",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
