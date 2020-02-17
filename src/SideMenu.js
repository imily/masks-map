import React from 'react';
import { Menu, Dropdown, Icon, Input } from 'antd';

const { Search } = Input;
const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

export default function SideMenu () {
    return (
        <div className="side-search">
        <div className="filter-type">
          <Search
            placeholder="我的位置"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
            className="search-main-style"
          />
          <Dropdown overlay={menu} trigger={['click']} className="select-main-style">
            <button className="ant-dropdown-link" href="#">
              距離<Icon type="caret-down" />
            </button>
          </Dropdown>
          <Dropdown overlay={menu} trigger={['click']} className="select-main-style">
            <button className="ant-dropdown-link" href="#">
              口罩種類<Icon type="caret-down" />
            </button>
          </Dropdown>
          <Dropdown overlay={menu} trigger={['click']} className="select-main-style">
            <button className="ant-dropdown-link">
              營業時間<Icon type="caret-down" />
            </button>
          </Dropdown>
          <button className="mark-button">
            <Icon type="star" />
          </button>
        </div>
        <ul className="shop-info">
          <li>
            <button className="mark-button">
              <Icon type="star" />
            </button>
            <span className="distance">10公尺</span>
            <p className="title">立赫健保藥局</p>
            <span className="address">台北市中正區新生南路1段16之2號</span>
            <span className="phone">(02) 3322-3231</span>
            <div className="business-hours">
              營業時間
              <Dropdown overlay={menu} trigger={['click']} className="select-sub-style">
                <button className="ant-dropdown-link">
                  星期五 10:00–22:00<Icon type="caret-down" />
                </button>
              </Dropdown>
            </div>
            <div className="quantity-display">
              <div className="adult">成人口罩 <strong>60</strong></div>
              <div className="child">兒童口罩 <strong>25</strong></div>
            </div>
            <div className="update-time">更新時間 2/7 09:20</div>
          </li>
          <li>
            <button className="mark-button">
              <Icon type="star" />
            </button>
            <span className="distance">10公尺</span>
            <p className="title">立赫健保藥局</p>
            <span className="address">台北市中正區新生南路1段16之2號</span>
            <span className="phone">(02) 3322-3231</span>
            <div className="business-hours">
              營業時間
              <Dropdown overlay={menu} trigger={['click']} className="select-sub-style">
                <button className="ant-dropdown-link">
                  星期五 10:00–22:00<Icon type="caret-down" />
                </button>
              </Dropdown>
            </div>
            <div className="quantity-display">
              <div className="adult">成人口罩 <strong>60</strong></div>
              <div className="child">兒童口罩 <strong>25</strong></div>
            </div>
            <div className="update-time">更新時間 2/7 09:20</div>
          </li>
        </ul>
      </div>
    )
}