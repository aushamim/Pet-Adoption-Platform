import { Link } from "react-router-dom";

const FourOFour = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-bold">404</h1>
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="mt-3 px-5 py-3 bg-purple-100 hover:bg-purple-300 hover:text-white font-medium duration-300 rounded-lg"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default FourOFour;
