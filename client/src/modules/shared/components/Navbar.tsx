import { Link } from "react-router-dom";
import CommunityIcon from "../../../assets/icons/CommunityIcon";
import Logotype from "./Logotype";
import UserAvatar from "./UserAvatar";
import RecipeIcon from "../../../assets/icons/RecipeIcon";


function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 bg-[#fafafa] p-3 border-b-2 border-#[#e0e0e0]">
      <div><Logotype className="h-10" /></div>
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2 text-sm hover:text-orange-hover transition-colors" to='/community'>
          <CommunityIcon className="h-4 w-4" />Comunidad
        </Link>
        <Link className="flex items-center gap-2 text-sm hover:text-orange-hover transition-colors" to='/recipes'>
          <RecipeIcon className="h-4 w-4" />Recetas
        </Link>
        <Link className="flex items-center gap-2 text-sm hover:text-orange-hover transition-colors" to='/profile'>
          <UserAvatar />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;