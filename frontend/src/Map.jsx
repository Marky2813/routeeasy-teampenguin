import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useZus } from "./store";

function Map() {
  const data = useZus((state) => state.ordersData);
  return (
    <>
      <MapContainer center={[28.595, 77.018]} zoom={15} scrollWheelZoom={true} className='h-full w-full rounded-xl'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((element) => {
          return (
            <>
              <Marker position={element.coordinates} >
                <Popup>
                  {element.orderId}
                </Popup>
              </Marker>
            </>
          )
        })}
      </MapContainer>
    </>
  )
}

export default Map; 