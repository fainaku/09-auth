import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note",
  description:
    "Add a new note to your personal collection. Capture important ideas, reminders, or tasks in one place.",
  openGraph: {
    title: "Create a New Note",
    description:
      "Add a new note to your personal collection. Capture important ideas, reminders, or tasks in one place.",
    url: "https://08-zustand-seven-snowy.vercel.app/notes/action/create",
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

const CreateNotes = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotes;
