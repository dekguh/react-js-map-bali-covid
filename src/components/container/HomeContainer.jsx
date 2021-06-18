import { MapContainer, GeoJSON, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DataMapBali from '../utils/data/bali.json';

const HomeContainer = () => {
    return (
        <div>
            <MapContainer center={[-8.409518, 115.188919]} zoom={10} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={DataMapBali.features} />
            </MapContainer>
        </div>
    )
}

export default HomeContainer
