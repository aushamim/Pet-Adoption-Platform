import { useNavigate, useParams } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { toast } from "sonner";

const handleSubmit = (e, APIHost, navigate, userId, petId, loadPets) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const name = e.target.elements["name"].value;
  const category = e.target.elements["category"].value;
  const breed = e.target.elements["breed"].value;
  const age = e.target.elements["age"].value;
  const description = e.target.elements["description"].value;
  const image = e.target.elements["image"].files[0];

  const formData = new FormData();
  formData.append("shelter", userId);
  formData.append("name", name);
  formData.append("category", category);
  formData.append("breed", breed);
  formData.append("age", age);
  formData.append("description", description);

  const promise = () => {
    if (image) {
      const imgFormData = new FormData();
      imgFormData.append("image", image);
      return fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: imgFormData,
        }
      )
        .then((imgRes) => imgRes.json())
        .then((imgData) => {
          formData.append(
            "image",
            imgData?.data ? imgData?.data?.image?.url : ""
          );

          fetch(`${APIHost}/pet/update/${petId}/`, {
            method: "PUT",
            headers: {
              Authorization: `Token ${token}`,
            },
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                throw new Error(data.error);
              } else {
                loadPets();
                navigate(-1, { replace: true });
                return data;
              }
            })
            .catch((error) => {
              throw error;
            });
        });
    } else {
      return fetch(`${APIHost}/pet/update/${petId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            loadPets();
            navigate(-1, { replace: true });
            return data;
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  toast.promise(promise, {
    loading: "Updating pet details. Please wait.",
    success: "Pet details updated successfully",
    error: (error) => {
      return error;
    },
  });
};

const EditPet = () => {
  const { APIHost, userId, loadPets } = useGlobalState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState({});
  const [petDetailsLoading, setPetDetailsLoading] = useState(true);

  useEffect(() => {
    setPetDetailsLoading(true);
    fetch(`${APIHost}/pet/all/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPetDetails(data);
        setPetDetailsLoading(false);
      });
  }, [APIHost, id]);

  return petDetailsLoading ? (
    <Loader />
  ) : (
    <div className="mt-10 xl:mt-16 bg-white pt-8 xl:pt-14 pb-10 xl:pb-24 bg-opacity-80 rounded-lg shadow">
      <h1 className="text-5xl font-bold text-center">Update Pet</h1>
      <span className="w-20 h-1 bg-purple-300 block mx-auto mt-2"></span>

      <form
        className="mt-10 xl:mt-16 w-5/6 xl:w-1/2 mx-auto"
        onSubmit={(e) => {
          handleSubmit(e, APIHost, navigate, userId, id, loadPets);
        }}
        encType="multipart/form-data"
      >
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            id="name"
            type="text"
            className="grow"
            placeholder="Name"
            defaultValue={petDetails?.name}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="category"
            type="text"
            className="grow"
            placeholder="Category ... (Cat, Dog, Bird, etc)"
            defaultValue={petDetails?.category}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="breed"
            type="text"
            className="grow"
            placeholder="Breed"
            defaultValue={petDetails?.breed}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="age"
            type="number"
            className="grow"
            placeholder="Age"
            defaultValue={petDetails?.age}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>
          <input
            id="description"
            type="text"
            className="grow"
            placeholder="Description"
            defaultValue={petDetails?.description}
          />
        </label>

        <label className="block mt-5">
          <input
            id="image"
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </label>

        <div className="mt-8 flex justify-end items-center">
          <input className="btn-purple ml-3" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default EditPet;
