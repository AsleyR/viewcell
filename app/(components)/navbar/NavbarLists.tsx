import Link from "next/link";
import NavbarUploadFileBtn from "../NavbarUploadFileBtn";

interface NavbarListProps {
    text: string;
    link: string;
}

function NavbarList({ text, link }: NavbarListProps) {
    return(
        <li>
            <Link href={link} className="cursor-pointer hover:bg-black/10 p-2 rounded-sm">
                {text}
            </Link>
        </li>
    )
}

export default function NavbarLists() {
    return(
        <div className="w-full">
                <ul className="flex items-center gap-10 justify-end">
                    {/* <NavbarList text="Home" link="/"/> */}
                    <NavbarUploadFileBtn />
                </ul>
            </div>
    )
}