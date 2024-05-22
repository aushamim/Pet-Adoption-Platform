import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import useGlobalState from "../../Hooks/useGlobalState";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const shortenDescription = (description) => {
  if (description.length <= 25) {
    return description;
  } else {
    return description.slice(0, 25) + " ...";
  }
};

const PetsSlider = () => {
  const { APIHost, pets, petsLoading } = useGlobalState();
  return (
    <div className="mt-3 bg-white bg-opacity-80 rounded-lg shadow-sm p-5">
      {petsLoading ? (
        <Loader />
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.2}
          spaceBetween={50}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCoverflow]}
          className="mySwiper"
        >
          {pets?.map((pet) => (
            <SwiperSlide key={pet?.id} className="rounded-lg overflow-hidden">
              <Link to={`/pets/${pet?.id}`}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 bg-purple-50">
                  <div>
                    <img
                      className="w-full h-80 object-cover"
                      src={
                        pet?.image ? APIHost + pet?.image : "/default-pet.jpg"
                      }
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
                                Pending
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
            </SwiperSlide>
          ))}
          <SwiperSlide className="rounded-lg overflow-hidden">
            <Link to="/pets">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 bg-purple-50 relative">
                <div className="invisible">
                  <div>
                    <img
                      className="w-full h-80 object-cover"
                      src="/default-pet.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 flex">
                    <table>
                      <tbody className="text-sm 2xl:text-lg">
                        <tr>
                          <td className="pb-1 font-medium">Status:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                        <tr>
                          <td className="pb-1 font-medium">Name:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                        <tr>
                          <td className="pb-1 font-medium">Breed:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                        <tr>
                          <td className="pb-1 font-medium">Age:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                        <tr>
                          <td className="pb-1 font-medium">Description:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                        <tr>
                          <td className="pb-1 font-medium">Shelter:</td>
                          <td className="pb-1 pl-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  See More
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
};

export default PetsSlider;
