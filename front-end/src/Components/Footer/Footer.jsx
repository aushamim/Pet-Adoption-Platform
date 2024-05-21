import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-16 bg-white rounded-t-lg shadow bg-opacity-80">
      <div className="xl:grid grid-cols-3 p-5">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-purple-500">Happy</span>Tails
          </h1>
        </div>

        <div className="mx-auto text-center">
          <p className="font-medium text-[#636363] mb-3">
            Address: Dhanmondi, Dhaka
          </p>
          <p className="font-medium text-[#636363] mb-3">
            Phone: +8801234567890
          </p>
          <p className="font-medium text-[#636363] mb-3">
            Email: happy.tails@gmail.com
          </p>
        </div>

        <div className="hidden xl:block mx-auto text-end">
          <Link
            to="/user/id"
            className="font-medium text-[#636363] hover:text-purple-600 block duration-300 mb-3"
          >
            Profile
          </Link>
          <Link
            to="/pets"
            className="font-medium text-[#636363] hover:text-purple-600 block duration-300 mb-3"
          >
            Pets
          </Link>
          <Link
            to="/adoption"
            className="font-medium text-[#636363] hover:text-purple-600 block duration-300 mb-3"
          >
            Adoption Requests
          </Link>
        </div>
      </div>

      <div className="pb-5 border-b-8 border-purple-500">
        <div className="font-medium text-[#636363] text-center">
          Copyright © 2024 HappyTails - All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
