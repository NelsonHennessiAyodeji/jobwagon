import LinkDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 px-24 flex items-center justify-between">
      <div>
        <LinkDropdown></LinkDropdown>
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle></ThemeToggle>
        <UserButton afterSignOutUrl="/"></UserButton>
      </div>
    </nav>
  );
}

export default Navbar;
