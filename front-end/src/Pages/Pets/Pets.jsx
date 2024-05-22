import { Link } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";

const Pets = () => {
  const { APIHost, pets } = useGlobalState();
  return (
    <div>
      <div className="mt-5 bg-white bg-opacity-80 rounded-lg shadow-sm p-5">
        <h1 className="text-2xl xl:text-3xl font-medium">
          All <span className="text-purple-500">Pets</span>
        </h1>
        <span className="w-10 h-1 bg-purple-300 block"></span>
      </div>

      <div className="mt-5 grid grid-cols-2 xl:grid-cols-4 gap-5">
        {pets?.map((pet) => (
          <Link
            key={pet?.id}
            to={`/pets/${pet?.id}`}
            className="w-full h-56 xl:h-96 relative bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden shadow-sm hover:scale-[1.02] duration-300"
            style={{
              backgroundImage: `url(${
                pet?.image
                  ? APIHost + pet?.image
                  : "/assets/images/default-pet.jpg"
              })`,
            }}
          >
            <div className="bg-white absolute left-2 bottom-2 right-2 xl:left-5 xl:bottom-5 xl:right-5 p-3 rounded-lg shadow-sm font-medium text-center">
              {pet?.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pets;
