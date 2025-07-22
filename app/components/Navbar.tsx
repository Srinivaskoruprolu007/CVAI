import { FiLogOut, FiUpload, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = usePuterStore();
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };
  return (
    <nav className="navbar bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl shadow-md flex items-center justify-between px-8 py-3">
      <Link to={"/"}>
        <p className="text-2xl font-bold text-gradient">CVAI</p>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to={"/upload"}
          className="primary-button w-fit rounded-xl bg-orange-400 hover:bg-orange-500 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FiUpload className="w-5 h-5" /> Upload
          </span>
        </Link>
        <Link
          to={"/wipe"}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-sm"
        >
          <FiUser className="w-5 h-5" />
          <span className="hidden sm:inline">My Account</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors shadow-sm"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
