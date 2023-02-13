
const getLocationCordinates = () =>
  new Promise((resolve, reject) => {
      if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
            localStorage.lat=position.coords.latitude;
            localStorage.lng=position.coords.longitude;
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        e =>
          resolve({
            lat: 21,
            lng: 71
          }),
        { enableHighAccuracy: true }
      );
    }
  });
  

export { getLocationCordinates };
