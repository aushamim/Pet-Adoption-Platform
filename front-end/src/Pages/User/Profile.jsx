import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";

const shortenDescription = (description) => {
  if (description.length <= 18) {
    return description;
  } else {
    return description.slice(0, 18) + " ...";
  }
};

const Profile = () => {
  const { id } = useParams();
  const { user, userId, APIHost } = useGlobalState();
  const [shelter, setShelter] = useState();
  const [shelterLoading, setShelterLoading] = useState(true);
  const [shelterPets, setShelterPets] = useState([]);
  const [shelterPetsLoading, setShelterPetsLoading] = useState(true);

  useEffect(() => {
    if (id == userId) {
      setShelter(user);
      setShelterLoading(false);
    } else {
      setShelterLoading(true);
      fetch(`${APIHost}/user/list/?user_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setShelter(data[0]);
          setShelterLoading(false);
        });
    }
    setShelterPetsLoading(true);
    fetch(`${APIHost}/pet/all/?shelter_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShelterPets(data);
        setShelterPetsLoading(false);
      });
  }, [APIHost, user, userId, id]);

  return (
    <div className="mt-10 xl:mt-10 grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="p-5 bg-white bg-opacity-80 rounded-lg shadow">
        <div className="flex items-center gap-3 border-b">
          <h1 className="text-2xl font-medium mb-1">Personal Information</h1>
          {id == userId ? (
            <Link to="/shelter/edit" className="btn-purple ml-auto">
              Edit
            </Link>
          ) : (
            ""
          )}
        </div>
        {shelterLoading ? (
          <Loader />
        ) : (
          <div className="mt-5">
            {shelter?.bio ? (
              <div className="mb-3">
                <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500">
                  <p className="text-sm italic font-medium leading-relaxed text-gray-900">
                    {shelter?.bio}
                  </p>
                </blockquote>
              </div>
            ) : (
              ""
            )}
            <table>
              <tbody>
                <tr>
                  <td className="pb-2 font-medium">Username:</td>
                  <td className="pl-2 pb-2">{shelter?.username}</td>
                </tr>
                <tr>
                  <td className="pb-2 font-medium">Name:</td>
                  <td className="pl-2 pb-2">
                    {shelter?.first_name} {shelter?.last_name}
                  </td>
                </tr>
                <tr>
                  <td className="pb-2 font-medium">Email:</td>
                  <td className="pl-2 pb-2">{shelter?.email}</td>
                </tr>
                <tr>
                  <td className="pb-2 font-medium">Phone No.:</td>
                  <td className="pl-2 pb-2">{shelter?.phone_no}</td>
                </tr>
                <tr>
                  <td className="pb-2 font-medium">Address:</td>
                  <td className="pl-2 pb-2">{shelter?.address}</td>
                </tr>
                <tr>
                  <td className="pb-2 font-medium">Number of Pets:</td>
                  <td className="pl-2 pb-2">{shelterPets?.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-5 bg-white bg-opacity-80 rounded-lg shadow">
        <div className="flex items-center gap-3 border-b">
          <h1 className="text-2xl font-medium mb-1">Pets</h1>
          {id == userId ? (
            <Link to="/pets/add" className="btn-purple ml-auto">
              Add
            </Link>
          ) : (
            ""
          )}
        </div>
        {shelterPetsLoading ? (
          <Loader />
        ) : (
          <div className="mt-5">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-4/6 xl:w-5/6"
            >
              {shelterPets?.map((pet) => (
                <SwiperSlide
                  key={pet?.id}
                  className="rounded-lg overflow-hidden"
                >
                  <Link to={`/pets/${pet?.id}`}>
                    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3 bg-purple-50">
                      <div>
                        <img
                          className="w-full h-40 xl:h-64 object-cover"
                          src={
                            pet?.image
                              ? pet?.image
                              : "/assets/images/default-pet.jpg"
                          }
                          alt={pet?.name}
                        />
                      </div>
                      <div className="p-3">
                        <table>
                          <tbody className="text-xs 2xl:text-base">
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
                                {pet?.shelter?.first_name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
