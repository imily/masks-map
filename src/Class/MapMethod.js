class MapMethod {
  /**
   * 計算緯度 / 經度點之間的距離
   * @param {*} locationA
   * @param {*} locationB
   */
  static calculateDistance(locationA, locationB) {
    // http://www.movable-type.co.uk/scripts/latlong.html
    const lat1 = locationA.lat;
    const lon1 = locationA.lng;

    const lat2 = locationB[1];
    const lon2 = locationB[0];

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return Math.round(distance); // in meters
  }

  /**
   * 生成範圍內的藥局列表
   * @param {*} userLocation
   * @param {*} shopes
   * @param {*} distance
   */
  static generateNearbyShop(userLocation, shopes, distance) {
    const list = [];
    for (let i = 0; i < shopes.length; i++) {
      if (
        this.calculateDistance(userLocation, shopes[i].geometry.coordinates) <=
        distance
      ) {
        list.push(shopes[i]);
      }
    }
    return list;
  }
}

export default MapMethod;
