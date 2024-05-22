import { Link } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";
import { useEffect, useState } from "react";

const shortenDescription = (description) => {
  if (description.length <= 25) {
    return description;
  } else {
    return description.slice(0, 25) + " ...";
  }
};

const Pets = () => {
  const { pets } = useGlobalState();
  const [filteredPets, setFilteredPets] = useState([]);
  useEffect(() => {
    if (pets.length <= 6) {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets);
    }
  }, [pets]);
  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {filteredPets?.map((pet) => (
        <Link key={pet?.id} to={`/pets/${pet?.id}`}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 bg-white bg-opacity-80 rounded-lg overflow-hidden hover:scale-[1.02] duration-300 shadow-sm hover:shadow-lg">
            <div>
              <img
                className="w-full h-80 object-cover"
                src={pet?.image ? pet?.image : "/assets/images/default-pet.jpg"}
                alt={pet?.name}
              />
            </div>
            <div className="p-3 flex">
              <table>
                <tbody className="text-sm 2xl:text-lg">
                  <tr>
                    <td className="pb-1 font-medium">Status:</td>
                    <td className="pb-1 pl-2">
                      {pet?.adoption_status == "adopted" ? (
                        <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                          Adopted
                        </span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                          Available
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-medium">Name:</td>
                    <td className="pb-1 pl-2">{pet?.name}</td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-medium">Breed:</td>
                    <td className="pb-1 pl-2">{pet?.breed}</td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-medium">Age:</td>
                    <td className="pb-1 pl-2">{pet?.age}</td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-medium">Description:</td>
                    <td className="pb-1 pl-2">
                      {shortenDescription(pet?.description)}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-medium">Shelter:</td>
                    <td className="pb-1 pl-2">
                      {pet?.shelter?.first_name} {pet?.shelter?.last_name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Pets;
