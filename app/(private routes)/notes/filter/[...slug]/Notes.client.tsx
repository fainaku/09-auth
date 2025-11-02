"use client";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import { Toaster } from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import { fetchNotes } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [perPage] = useState<number>(12);

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    1000
  );

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, search, perPage, tag],
    queryFn: () => fetchNotes({ search, page, perPage, tag }),
    retry: 3,
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#333",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#333",
            },
          },
        }}
      />
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={updateSearchQuery} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </header>

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
};

export default NotesClient;
