import "./App.css";
import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import AboutUs from "./routes/about-us/about.component";
import PageNotFound from "./routes/not-found/not-found.component";
import Form from "./routes/form/form.component";
import PhotoDetails from "components/photoDetails/photoDetails.components";

const App: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<NavigationBar />}>
        <Route index element={<Navigate to="/home" replace />}></Route>
        <Route path={"home"} element={<Home />}></Route>
        <Route path={"about-us"} element={<AboutUs />}></Route>
        <Route path={"submit"} element={<Form />}></Route>
        <Route path={"photo"} element={<PhotoDetails />}></Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
