import Link from "next/link";

interface LogoProps {
    logoText?: string
}

function Logo({ logoText="ViewCell"}: LogoProps) {
    return(
        <div className="text-2xl font-bold">
            <Link href={"/"}>
                {logoText}
            </Link>
        </div>
    )
}
 
export default Logo;