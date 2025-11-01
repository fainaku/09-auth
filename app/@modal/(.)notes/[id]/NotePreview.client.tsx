"use client";

import NoteDetailsClient from "@/app/(private routes)/notes/[id]/NoteDetails.client";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./NotePreviewClient.module.css";

const NotePreviewClient = () => {
  const router = useRouter();
  const close = () => router.back();

  return (
    <>
      <Modal onClose={close}>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
        <NoteDetailsClient />
      </Modal>
    </>
  );
};

export default NotePreviewClient;
