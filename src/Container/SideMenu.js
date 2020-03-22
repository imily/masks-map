import React, { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Menu, Dropdown, Icon, Input, Skeleton } from 'antd';
import {
  dispatchReceiveSelectedDistance,
  dispatchReceiveSelectedMask
} from '../Redux/Action/SeletedOption';

const { Search } = Input;
const DEFAULT_DISTANCE = 5000;

export default function SideMenu () {
    const dispatch = useDispatch();
    function calculateDistance(pointA, pointB) {
      // http://www.movable-type.co.uk/scripts/latlong.html
      const lat1 = pointA.lat;
      const lon1 = pointA.lng;
    
      const lat2 = pointB[1];
      const lon2 = pointB[0];
    
      const R = 6371e3; // earth radius in meters
      const φ1 = lat1 * (Math.PI / 180);
      const φ2 = lat2 * (Math.PI / 180);
      const Δφ = (lat2 - lat1) * (Math.PI / 180);
      const Δλ = (lon2 - lon1) * (Math.PI / 180);
    
      const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
                ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      const distance = R * c;
      return Math.round(distance); // in meters
    }
    
    function generateNearbyShop(userLocation, shopes, distance){
      const list = [];
      for (let i = 0; i < shopes.length; i ++) {
        if (calculateDistance(userLocation, shopes[i].geometry.coordinates) <= distance) {
          list.push(shopes[i]);
        };
      }
      return list;
    }

    function gererateBusinessHours(text) {
      return text.split('、');
    }

    const onClick = (e) => {
      const type = e.domEvent.currentTarget.getAttribute('data-type');
      const info = e.domEvent.currentTarget.getAttribute('data-info');
      const text = e.domEvent.currentTarget.getAttribute('data-text');
      if (type === 'distance') {
        const distance = {
          text,
          info: parseInt(info),
        };
        dispatch(dispatchReceiveSelectedDistance(distance));
      }
      if (type === 'mask') {
        const mask = {
          text,
          info,
        };
        dispatch(dispatchReceiveSelectedMask(mask));
      }
    };
    
    function gererateDropMenu(list) {
      const menu = list.map((item, index) => 
        <Menu.Item
          key={index}
          onClick={onClick}
          data-type={item.type}
          data-info={item.info}
          data-text={item.text}
        >
          {item.text}
        </Menu.Item>
      );
      return (
        <Menu>
          {menu}
        </Menu>
      );
    }

    const distanceData = [
      {
        type: 'distance',
        info: 1,
        text: '一公里'
      },
      {
        type: 'distance',
        info: 5,
        text: '五公里'
      },
      {
        type: 'distance',
        info: 10,
        text: '十公里'
      }
    ];

    const maskTypeData = [
      {
        type: 'mask',
        info: 'all',
        text: '全部'
      },
      {
        type: 'mask',
        info: 'adult',
        text: '成人口罩'
      },
      {
        type: 'mask',
        info: 'child',
        text: '兒童口罩'
      }
    ];

    const mapState = useCallback(
      state => ({
        location: state.location.list,
        shopes: state.shopes.list,
        distance: state.selectedOption.distance,
        mask: state.selectedOption.mask
      }), []);
    const { location, shopes, distance, mask } = useMappedState(mapState);
    const isLoading = ((location.length === 0) || (shopes.length === 0));

    const maskSelectorText = maskTypeData.forEach(item => item.info === mask.info) ? mask.text : '口罩種類';

    return (
      <div className="side-search">
          <div className="filter-type">
            <Search
              placeholder="我的位置"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
              className="search-main-style"
            />
            {isLoading ? (<Skeleton active />) : (
            <>
              <Dropdown
                overlay={gererateDropMenu(distanceData)}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
                  {distance.text}
                  <Icon type="caret-down" />
                </button>
              </Dropdown>
              <Dropdown
                overlay={gererateDropMenu(maskTypeData)}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
                  {console.log(mask, maskSelectorText)}
                  {maskSelectorText}
                  <Icon type="caret-down" />
                </button>
              </Dropdown>
              <Dropdown
                overlay={gererateDropMenu(gererateBusinessHours(shopes[0].properties.available))}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link">
                  營業時間<Icon type="caret-down" />
                </button>
              </Dropdown>
            </>
            )}
            <button className="mark-button">
              <Icon type="star" />
            </button>
          </div>
          {isLoading ? (<Skeleton active />) : (
            <ul className="shop-info">
            {generateNearbyShop(location, shopes, DEFAULT_DISTANCE).length === 0 ? (<p>附近無藥局</p>) :
              (generateNearbyShop(location, shopes, DEFAULT_DISTANCE).map(shop => (
              <li key={shop.properties.id}>
                <button className="mark-button">
                  <Icon type="star" />
                </button>
                <span className="distance">{calculateDistance(location, shop.geometry.coordinates)}公尺</span>
                <p className="title">{shop.properties.name}</p>
                <span className="address">{shop.properties.address}</span>
                <span className="phone">{shop.properties.phone}</span>
                <div className="business-hours">
                  營業時間
                  <Dropdown
                    overlay={gererateDropMenu(gererateBusinessHours(shop.properties.available))}
                    trigger={['click']} className="select-sub-style"
                  >
                    <button className="ant-dropdown-link">
                      查看<Icon type="caret-down" />
                    </button>
                  </Dropdown>
                </div>
                <div className="quantity-display">
                  <div className="adult">成人口罩 <strong>{shop.properties.mask_adult}</strong></div>
                  <div className="child">兒童口罩 <strong>{shop.properties.mask_child}</strong></div>
                </div>
                <div className="update-time">更新時間 {shop.properties.updated}</div>
              </li>)
            ))}
          </ul>
          )}
      </div>
    )
}
