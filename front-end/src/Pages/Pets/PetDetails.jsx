import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { toast } from "sonner";

const handleDelete = (APIHost, petId, loadPets, navigate) => {
  const token = localStorage.getItem("token");
  const promise = () => {
    return fetch(`${APIHost}/pet/delete/${petId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        loadPets();
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  toast.promise(promise, {
    loading: "Removing pet information. Please wait.",
    success: "Pet information removed successfully",
    error: (error) => {
      return error;
    },
  });

  navigate(-1, { replace: true });
};

const PetDetails = () => {
  const { APIHost, userId, loadPets } = useGlobalState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState({});
  const [petDetailsLoading, setPetDetailsLoading] = useState(true);

  useEffect(() => {
    setPetDetailsLoading(true);
    fetch(`${APIHost}/pet/all/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPetDetails(data);
        setPetDetailsLoading(false);
      });
  }, [APIHost, id]);

  return petDetailsLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="mt-5 bg-white bg-opacity-80 rounded-lg shadow-sm p-5 text-xl font-medium text-center">
        {petDetails?.name}
      </div>
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white p-5 bg-opacity-80 rounded-lg shadow-sm">
          <img
            className="w-full h-auto max-h-80 xl:max-h-96 object-cover rounded-lg"
            src={
              petDetails?.image
                ? petDetails?.image
                : "/assets/images/default-pet.jpg"
            }
            alt={petDetails?.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="bg-white p-5 bg-opacity-80 rounded-lg shadow-sm flex-grow">
            <table>
              <tbody className="text-sm 2xl:text-lg">
                <tr>
                  <td className="pb-1 font-medium">Status:</td>
                  <td className="pb-1 pl-2">
                    {petDetails?.adoption_status == "adopted" ? (
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
                  <td className="pb-1 pl-2">{petDetails?.name}</td>
                </tr>
                <tr>
                  <td className="pb-1 font-medium">Breed:</td>
                  <td className="pb-1 pl-2">{petDetails?.breed}</td>
                </tr>
                <tr>
                  <td className="pb-1 font-medium">Age:</td>
                  <td className="pb-1 pl-2">{petDetails?.age}</td>
                </tr>
                <tr>
                  <td className="pb-1 font-medium">Description:</td>
                  <td className="pb-1 pl-2">{petDetails?.description}</td>
                </tr>
                <tr>
                  <td className="pb-1 font-medium">Shelter:</td>
                  <td className="pb-1 pl-2">
                    <Link
                      to={`/shelter/${petDetails?.shelter?.id}`}
                      className="hover:text-purple-500 duration-300"
                    >
                      {petDetails?.shelter?.first_name}{" "}
                      {petDetails?.shelter?.last_name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-5 bg-opacity-80 mt-5 rounded-lg shadow-sm flex items-center">
            <h1
              className={
                petDetails?.shelter?.id == userId
                  ? "text-lg font-medium hidden xl:block"
                  : "text-lg font-medium"
              }
            >
              Actions:
            </h1>
            <div
              className={
                petDetails?.shelter?.id == userId
                  ? "mx-auto xl:mr-0 flex items-center -mb-2 gap-3"
                  : "ml-auto flex items-center -mb-2 gap-3"
              }
            >
              {petDetails?.shelter?.id == userId ? (
                <>
                  <Link
                    to={`/pets/${petDetails?.id}/edit`}
                    className="btn-purple"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(APIHost, petDetails?.id, loadPets, navigate);
                    }}
                    className="btn-red"
                  >
                    Delete
                  </button>
                  <button className="btn-lime">Give Adoption</button>
                </>
              ) : (
                ""
              )}
              {petDetails?.shelter?.id != userId ? (
                <>
                  <button className="btn-green">Request for Adoption</button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
