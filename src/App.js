import React from 'react';
import './App.scss';
import SideMenu from './SideMenu';
import MyMap from './MyMap';

export default function App() {
  return (
    <div className="container">
      <SideMenu />
      <MyMap />
    </div>
  );
}

