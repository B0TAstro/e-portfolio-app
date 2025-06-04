// app/components/global/Navbar.tsx

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/icons/logo.png";
import Theme from "./Theme";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const data = [
        {
            title: "IUT",
            href: "/iut",
        },
        {
            title: "Alternance",
            href: "/alternance",
        },
        {
            title: "Perso/Pro",
            href: "/perso-pro",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ];

    return (
        <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-10 mb-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/">
                    <Image src={Logo} width={35} height={35} alt="logo" />
                </Link>

                <nav className="md:block hidden">
                    <ul className="flex items-center gap-x-8">
                        {data.map((link, id) => (
                            <li key={id}>
                                <Link
                                    href={link.href}
                                    className="dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-green-400 duration-300 text-base"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-x-4">
                    <Theme />
                    <MobileMenu />
                </div>

            </div>
        </header>
    );
}