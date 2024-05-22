import { Link, useNavigate } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";

const Navbar = () => {
  const { user, userId, logout } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 p-5 my-5 bg-white shadow-sm rounded-lg bg-opacity-80">
      <div className="text-3xl font-bold flex items-center">
        <Link to="/">
          <span className="text-purple-500">Happy</span>Pals
        </Link>
      </div>

      <div className="hidden xl:flex text-center font-medium items-center justify-end pr-3">
        <Link
          to="/"
          className=" text-gray-500 hover:text-purple-500 duration-300"
        >
          Home
        </Link>
        <Link
          to="/pets"
          className="ml-5 text-gray-500 hover:text-purple-500 duration-300"
        >
          Pets
        </Link>
        {user ? (
          <>
            <Link
              to="/adoption"
              className="ml-5 text-gray-500 hover:text-purple-500 duration-300"
            >
              Adoption Requests
            </Link>
            <Link
              to={`/shelter/${userId}`}
              className="ml-5 text-gray-500 hover:text-purple-500 duration-300"
            >
              Profile
            </Link>
            <button
              className="ml-5 text-gray-500 hover:text-purple-500 duration-300"
              onClick={() => {
                logout(navigate);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="ml-5 text-gray-500 hover:text-purple-500 duration-300"
          >
            Login
          </Link>
        )}
      </div>

      <div className="block xl:hidden drawer drawer-end">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-end">
          <label htmlFor="nav-drawer" className="drawer-button btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="nav-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-white text-base-content text-lg bg-opacity-90 backdrop-blur-sm">
            {/* Sidebar */}
            <li className="mt-3 mb-5 text-center text-2xl font-semibold uppercase text-purple-500">
              Navigation
            </li>
            <li>
              <Link
                to="/"
                className=" text-gray-500 hover:text-purple-500 duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pets"
                className="text-gray-500 hover:text-purple-500 duration-300"
              >
                Pets
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/adoption"
                    className="text-gray-500 hover:text-purple-500 duration-300"
                  >
                    Adoption Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shelter/${userId}`}
                    className="text-gray-500 hover:text-purple-500 duration-300"
                  >
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            <li>
              {user ? (
                <button
                  className="text-gray-500 hover:text-purple-500 duration-300"
                  onClick={() => {
                    logout(navigate);
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-purple-500 duration-300"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
