export default function initMap () {
    return new Promise((res, rej) => {
      navigator.geolocation.watchPosition(position => {
        res({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    });
  }
