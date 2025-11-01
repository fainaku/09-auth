import Link from "next/link";
import css from "./SidebarNotes.module.css";
import style from "@/app/(private routes)/notes/filter/[...slug]/page.module.css";

const SidebarNotes = () => {
  const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/action/create" className={style.buttonSidebar}>
          Create note +
        </Link>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
