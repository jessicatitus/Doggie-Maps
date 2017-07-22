export default function currentLocation(onSuccess) {
  navigator.geolocation.getCurrentPosition((pos) => {
    const coords = pos.coords;
    const { latitude, longitude } = coords;
    onSuccess({ latitude, longitude })
  });
}
