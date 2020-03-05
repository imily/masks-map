import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Menu, Dropdown, Icon, Input, Skeleton } from 'antd';

const { Search } = Input;

export default function SideMenu () {
    function calculateDistance(pointA, pointB) {
      // http://www.movable-type.co.uk/scripts/latlong.html
      const lat1 = pointA[0];
      const lon1 = pointA[1];
    
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
    
    function gererateDropMenu(list) {
      const menu = list.map((item, index) => 
        <Menu.Item key={index}>
          {item}
        </Menu.Item>
      );
      return (
        <Menu>
          {menu}
        </Menu>
      );
    }

    const mapState = useCallback(
      state => ({
        loaction: state.location.list,
        shopes: state.shopes.list
      }), []);
    const { loaction, shopes } = useMappedState(mapState);
    const isLoading = ((loaction.length === 0) || (shopes.length === 0));
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
                overlay={gererateDropMenu(['一公里', '五公里', '十公里'])}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
                  距離<Icon type="caret-down" />
                </button>
              </Dropdown>
              <Dropdown
                overlay={gererateDropMenu(['成人口罩', '兒童口罩'])}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
                  口罩種類<Icon type="caret-down" />
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
            {generateNearbyShop(loaction, shopes, 1000).map(shop => (
              <li key={shop.properties.id}>
                <button className="mark-button">
                  <Icon type="star" />
                </button>
                <span className="distance">{calculateDistance(loaction, shop.geometry.coordinates)}公尺</span>
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
              </li>
            ))}
          </ul>
          )}
      </div>
    )
}