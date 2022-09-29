import './App.css';
import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/home.component';
import NavigationBar from './routes/navigation/navigation.component';
import AboutUs from './routes/about-us/about.component';
import PageNotFound from './routes/not-found/not-found.component';
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path={'/'} element={<NavigationBar />}>
          <Route index element={<Navigate to="/home" replace />}></Route>
          <Route path={'home'} element={<Home />}></Route>
          <Route path={'about-us'} element={<AboutUs />}></Route>
        </Route>
      </Routes>
    )
  }
}

export default App;
