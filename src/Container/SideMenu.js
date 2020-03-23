import React, { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Menu, Dropdown, Icon, Input, Skeleton } from 'antd';
import {
  dispatchReceiveSelectedDistance,
  dispatchReceiveSelectedMask
} from '../Redux/Action/SeletedOption';
import MapMethod from '../Class/MapMethod';
import SelectData from '../Class/SelectData';

const { Search } = Input;
const DEFAULT_DISTANCE = 5000;

export default function SideMenu () {
    const dispatch = useDispatch();

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

    const mapState = useCallback(
      state => ({
        location: state.location.list,
        shopes: state.shopes.list,
        distance: state.selectedOption.distance,
        mask: state.selectedOption.mask
      }), []);
    const { location, shopes, distance, mask } = useMappedState(mapState);
    const isLoading = ((location.length === 0) || (shopes.length === 0));

    const maskSelectorText = SelectData.mask.forEach(item => item.info === mask.info) ? mask.text : '口罩種類';

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
                overlay={gererateDropMenu(SelectData.distance)}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
                  {distance.text}
                  <Icon type="caret-down" />
                </button>
              </Dropdown>
              <Dropdown
                overlay={gererateDropMenu(SelectData.mask)}
                trigger={['click']} className="select-main-style"
              >
                <button className="ant-dropdown-link" href="#">
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
            {MapMethod.generateNearbyShop(location, shopes, DEFAULT_DISTANCE).length === 0 ? (<p>附近無藥局</p>) :
              (MapMethod.generateNearbyShop(location, shopes, DEFAULT_DISTANCE).map(shop => (
              <li key={shop.properties.id}>
                <button className="mark-button">
                  <Icon type="star" />
                </button>
                <span className="distance">{MapMethod.calculateDistance(location, shop.geometry.coordinates)}公尺</span>
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
