import { AppContext } from "contexts/context";
import Photo from "Interfaces";
import React, { FC, useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

const PhotoDetails: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.selectedPhoto === null) {
      navigate("/home");
    }
  }, [state.selectedPhoto]);

  if (state.selectedPhoto === null) {
    return null;
  }

  const { id, title, secret, server, owner } = state.selectedPhoto;

  const handleBackClick = () => {
    dispatch({
      type: "selectPhoto",
      payload: null,
    });
    navigate("/home");
  };

  return (
    <div>
      <button onClick={handleBackClick} className="backButton">Back</button>
      <h2>{title}</h2>
      <p>{`Owner: ${owner}`}</p>
      <p>{`ID: ${id}`}</p>
      <p>{`Server: ${server}`}</p>
      <img
        alt="monster"
        src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg}`}
      />
    </div>
  );
};

export default PhotoDetails;
