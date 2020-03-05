export default function initMap () {
    return new Promise((res, rej) => {
      navigator.geolocation.watchPosition(position => {
        res([position.coords.latitude, position.coords.longitude]);
      });
    });
  }
