import axios from "axios";

const callGetShopes = () => {
  const url =
    "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";
  return axios.get(url).then((response) => response.data.features);
};

export default callGetShopes;
