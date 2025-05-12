import { BiLogOut } from "react-icons/bi"

import { Link } from "react-router"
import { auth } from "../../services/firaseBaseConnect";
import { signOut } from "firebase/auth";

export function Header() {
 
  async function handleLogOut() {
    await signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white border-0 h-12 flex items-center justify-between px-3 rounded-xl ">
        <div className=" flex gap-4 font-medium">
          <Link to="/">
            Home
          </Link>

          <Link to="/admin">
            Links
          </Link>

          <Link to="/admin/social">
            Rede Sociais
          </Link>
        </div>

        <button className="cursor-pointer transition-transform hover:scale-125" onClick={handleLogOut}>
          <BiLogOut size={30} color="#c51D1D" />
        </button>
      </nav>
   
   </header>
  )
}