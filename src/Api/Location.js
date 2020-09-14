/**
 * 取得目前位置
 */
export default function getCurrentLocation() {
  return new Promise((res) => {
    navigator.geolocation.watchPosition((position) => {
      res({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  });
}
