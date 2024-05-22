import { useEffect, useState } from "react";
import useGlobalState from "../../Hooks/useGlobalState";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDateTime = date.toLocaleDateString("en-US", options);
  return formattedDateTime;
};

const handleCancel = (APIHost, id, loadSelfRequests) => {
  const token = localStorage.getItem("token");
  const promise = () => {
    return fetch(`${APIHost}/adoption/delete/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        loadSelfRequests();
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  toast.promise(promise, {
    loading: "Cancelling request. Please wait.",
    success: "Request cancelled successfully",
    error: (error) => {
      return error;
    },
  });
};

const handleAccept = (APIHost, id, loadOtherRequests) => {
  const token = localStorage.getItem("token");
  const promise = () => {
    return fetch(`${APIHost}/adoption/respond/${id}/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        loadOtherRequests();
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  toast.promise(promise, {
    loading: "Working. Please wait.",
    success: "Request approved successfully",
    error: (error) => {
      return error;
    },
  });
};
const handleReject = (APIHost, id, loadOtherRequests) => {
  const token = localStorage.getItem("token");
  const promise = () => {
    return fetch(`${APIHost}/adoption/respond/${id}/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: "rejected" }),
    })
      .then((res) => res.json())
      .then((data) => {
        loadOtherRequests();
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  toast.promise(promise, {
    loading: "Working. Please wait.",
    success: "Request approved successfully",
    error: (error) => {
      return error;
    },
  });
};

const AdoptionRequests = () => {
  const { APIHost, userId } = useGlobalState();
  const [selfRequests, setSelfRequests] = useState([]);
  const [selfRequestsLoading, setSelfRequestsLoading] = useState(true);
  const [otherRequests, setOtherRequests] = useState([]);
  const [otherRequestsLoading, setOtherRequestsLoading] = useState(true);

  const loadSelfRequests = () => {
    setSelfRequestsLoading(true);
    fetch(`${APIHost}/adoption/all/?applicant_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelfRequests(data);
        setSelfRequestsLoading(false);
      });
  };
  const loadOtherRequests = () => {
    setOtherRequestsLoading(true);
    fetch(`${APIHost}/adoption/all/?not_applicant_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOtherRequests(data);
        setOtherRequestsLoading(false);
      });
  };

  useEffect(() => {
    loadSelfRequests();
    loadOtherRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <div className="mt-5 bg-white bg-opacity-80 rounded-lg shadow-sm p-5">
        <h1 className="text-2xl xl:text-3xl font-medium">
          <span className="text-purple-500">Your</span> Adoption Requests
        </h1>
        <span className="w-16 h-1 bg-purple-300 block"></span>
      </div>
      <div className="mt-3 mb-10 bg-white bg-opacity-80 rounded-lg shadow-sm p-5 overflow-x-auto">
        {selfRequestsLoading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Pet Name</th>
                <th>Category</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Shelter</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selfRequests?.map((request) => (
                <tr key={request?.id} className="hover">
                  <td>{selfRequests?.indexOf(request) + 1}</td>
                  <td>{request?.pet?.name}</td>
                  <td>{request?.pet?.category}</td>
                  <td>{request?.pet?.breed}</td>
                  <td>{request?.pet?.age}</td>
                  <td>
                    <Link
                      className="hover:text-purple-500"
                      to={`/shelter/${request?.pet?.shelter?.id}`}
                    >
                      {request?.pet?.shelter?.first_name}{" "}
                      {request?.pet?.shelter?.last_name}
                    </Link>
                  </td>
                  <td>{formatDateTime(request?.timestamp)}</td>
                  <td>
                    {request?.status == "approved" ? (
                      <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Approved
                      </span>
                    ) : request?.status == "pending" ? (
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (
                          request?.status == "approved" ||
                          request?.status == "rejected"
                        ) {
                          toast.error("Failed to Cancel. Already Responded");
                        } else {
                          handleCancel(APIHost, request?.id, loadSelfRequests);
                        }
                      }}
                      className="btn-purple"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-5 bg-white bg-opacity-80 rounded-lg shadow-sm p-5">
        <h1 className="text-2xl xl:text-3xl font-medium">
          <span className="text-purple-500">Requests</span> to Adopt from You
        </h1>
        <span className="w-16 h-1 bg-purple-300 block"></span>
      </div>
      <div className="mt-3 bg-white bg-opacity-80 rounded-lg shadow-sm p-5 overflow-x-auto">
        {otherRequestsLoading ? (
          <Loader />
        ) : (
          <table className="table table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Pet Name</th>
                <th>Category</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Applicant</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {otherRequests?.map((request) => (
                <tr key={request?.id} className="hover">
                  <td>{otherRequests?.indexOf(request) + 1}</td>
                  <td>{request?.pet?.name}</td>
                  <td>{request?.pet?.category}</td>
                  <td>{request?.pet?.breed}</td>
                  <td>{request?.pet?.age}</td>
                  <td>
                    <Link
                      className="hover:text-purple-500"
                      to={`/shelter/${request?.applicant?.id}`}
                    >
                      {request?.applicant?.first_name}{" "}
                      {request?.applicant?.last_name}
                    </Link>
                  </td>
                  <td>{formatDateTime(request?.timestamp)}</td>
                  <td>
                    {request?.status == "approved" ? (
                      <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Approved
                      </span>
                    ) : request?.status == "pending" ? (
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => {
                        handleAccept(APIHost, request?.id, loadOtherRequests);
                      }}
                      className="btn-green"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        handleReject(APIHost, request?.id, loadOtherRequests);
                      }}
                      className="btn-red"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdoptionRequests;
