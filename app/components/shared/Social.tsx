// app/components/shared/Social.tsx

import Link from "next/link";
import { socialLinks } from "../assets/Social";

export default function Social({ type }: { type: "social" | "publication" }) {
  return (
    <ul className="flex items-center flex-wrap gap-6">
      {socialLinks
        .filter((item) => item.status === type)
        .map((value) => (
          <li key={value.id}>
            <Link
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-b dark:border-b-zinc-800 border-zinc-200 group"
            >
              <value.icon
                className="flex-shrink-0 h-5 w-5 text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />{" "}
              &nbsp;
              {value.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}