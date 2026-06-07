import Logo from "./Logo";
import NavbarLists from "./NavbarLists";

const Navbar = () => {
    return (
        <nav className="grid grid-cols-2 items-center justify-center bg-gray-100 text-black py-2 px-10 border-b border-gray-400">
            <Logo />
            <NavbarLists />
        </nav>
    );
}
 
export default Navbar;