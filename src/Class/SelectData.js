class SelectData {
  static distance = [
    {
      type: "distance",
      info: 1,
      text: "一公里",
    },
    {
      type: "distance",
      info: 5,
      text: "五公里",
    },
    {
      type: "distance",
      info: 10,
      text: "十公里",
    },
  ];
  static mask = [
    {
      type: "mask",
      info: "all",
      text: "全部",
    },
    {
      type: "mask",
      info: "adult",
      text: "成人口罩",
    },
    {
      type: "mask",
      info: "child",
      text: "兒童口罩",
    },
  ];
}

export default SelectData;
