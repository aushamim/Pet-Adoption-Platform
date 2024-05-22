import { Link } from "react-router-dom";
import Pets from "../../Components/Pets/Pets";
import PetsSlider from "../../Components/Pets/PetsSlider";

const HomePage = () => {
  return (
    <div className="mt-5 xl:mt-10">
      <div
        className="grid grid-cols-2 bg-cover bg-no-repeat h-52 lg:h-[35rem] 2xl:h-[48rem] rounded-lg"
        style={{ backgroundImage: "url(/hero.png)" }}
      >
        <div className="flex flex-col justify-center pl-5 lg:pl-10 2xl:pl-20">
          <p className="text-xs xl:text-2xl">Hi, Welcome to</p>
          <h1 className="text-2xl lg:text-7xl 2xl:text-8xl font-medium">
            Happy Tails
          </h1>
          <p className="text-xs xl:text-2xl font-medium mt-1 xl:mt-5">
            Make yourself a furry friend today!
          </p>
        </div>
        <div></div>
      </div>

      <div className="mt-10 bg-white bg-opacity-80 rounded-lg shadow-sm p-5 flex items-center">
        <div>
          <h1 className="text-2xl xl:text-3xl font-medium">
            Pets Available for <span className="text-purple-500">Adoption</span>
          </h1>
          <span className="w-20 h-1 bg-purple-300 block"></span>
        </div>
        <div className="ml-auto hidden xl:block">
          <Link to="/pets" className="btn-purple">
            See More
          </Link>
        </div>
      </div>
      <div>
        <div className="block xl:hidden">
          <PetsSlider />
        </div>
        <div className="hidden xl:block">
          <Pets />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
