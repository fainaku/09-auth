import { cookies } from "next/headers";
import { nextServer } from "./api";
import { FetchNotesResponse, User } from "./clientApi";
import { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerNotes = async ({
  search,
  page = 1,
  perPage = 12,
  tag,
}: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
