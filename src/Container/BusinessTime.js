import React from "react";
import { Table } from "antd";
import Common from "../Class/Common";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Column } = Table;

export default function BusinessTime(props) {
  const timeList = Common.gererateBusinessHours(props.timeList);
  let morning = [];
  let afternoon = [];
  let night = [];

  timeList.forEach((item) => {
    if (item.search("上午") > 0) {
      morning.push(item);
    }
    if (item.search("下午") > 0) {
      afternoon.push(item);
    }
    if (item.search("晚上") > 0) {
      night.push(item);
    }
  });

  const icon = <CheckCircleTwoTone twoToneColor="#78D5D7" />;
  const morningOpenList = Common.gererateTimeTable(morning, "上午", icon);
  const afternoonOpenList = Common.gererateTimeTable(afternoon, "下午", icon);
  const nightOpenList = Common.gererateTimeTable(night, "晚上", icon);

  const data = [
    {
      key: "1",
      time: "早",
      ...morningOpenList,
    },
    {
      key: "2",
      time: "中",
      ...afternoonOpenList,
    },
    {
      key: "3",
      time: "晚",
      ...nightOpenList,
    },
  ];

  return (
    <Table dataSource={data} pagination={false} bordered={true}>
      <Column title="" dataIndex="time" key="time" align="center" />
      <Column title="日" dataIndex="sunday" key="sunday" align="center" />
      <Column title="一" dataIndex="monday" key="monday" align="center" />
      <Column title="二" dataIndex="tuesday" key="tuesday" align="center" />
      <Column title="三" dataIndex="wednesday" key="wednesday" align="center" />
      <Column title="四" dataIndex="thursday" key="thursday" align="center" />
      <Column title="五" dataIndex="friday" key="friday" align="center" />
      <Column title="六" dataIndex="saturday" key="saturday" align="center" />
    </Table>
  );
}
