import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function Map({ dummyData }) {
  return (
    <>
      <MapContainer center={[28.595, 77.018]} zoom={15} scrollWheelZoom={true} className='h-full w-full rounded-xl'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.595, 77.018]} className='color-red-600'>
          <Popup>
            Order 01: GGSIPU
          </Popup>
        </Marker>
        {dummyData.map((element) => {
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