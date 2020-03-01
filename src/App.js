import React from 'react';
import './Css/App.scss';
import SideMenu from './Container/SideMenu';
import MyMap from './Container/MyMap';

export default function App() {
  return (
    <div className="container">
      <SideMenu />
      <MyMap />
    </div>
  );
}

