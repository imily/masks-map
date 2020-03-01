import axios from 'axios';

export const callGetShopes = () => {
    const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
    return axios.get(url)
        .then(response => (response.data.features));
}
