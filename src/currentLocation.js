export default function currentLocation(onSuccess) {
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = position.coords;
    const { latitude, longitude } = coords;
    onSuccess({ latitude, longitude })
  });
}
