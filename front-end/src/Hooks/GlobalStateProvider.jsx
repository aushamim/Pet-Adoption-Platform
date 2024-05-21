import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext(null);

const GlobalStateProvider = ({ children }) => {
  // const APIHost = "https://pet-adoption-platform.onrender.com";
  const APIHost = "http://127.0.0.1:8000";

  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem("user_id")) || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`${APIHost}/user/all/?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setUser(data[0]);
          }
        });
    }
  }, [APIHost, userId]);

  return (
    <GlobalContext.Provider
      value={{
        APIHost,
        userId,
        setUserId,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStateProvider;
