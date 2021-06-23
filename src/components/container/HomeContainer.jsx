import { MapContainer, GeoJSON, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DataMapBali from '../utils/data/bali.json';
import MarkerIcon from '../utils/MarkerIcon';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { io } from 'socket.io-client';

const HomeContainer = () => {
    const [data, setData] = useState([]);
    const [dataSocket, setDataSocket] = useState([]);
    const socket = io('ws://afternoon-taiga-61459.herokuapp.com', {transports: ['websocket']});

    socket.on('data_map_ready', (result) => {
        setDataSocket(result)
    })

    useEffect(() => {
        const fecthDataCovid = async () => {
            const response = await axios.get('https://afternoon-taiga-61459.herokuapp.com/data-covids');
            const result = response.data;
            setData(result);
        }

        fecthDataCovid();
    }, [])

    useEffect(() => {
        setData(dataSocket);
    }, [dataSocket]);

    return (
        <div>
            <MapContainer center={[-8.409518, 115.188919]} zoom={10} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={DataMapBali.features} />

                {data?.length >= 1 && data.map((info, i) => (
                    <Marker key={i} position={[info.latitude, info.longitude]} icon={MarkerIcon}>
                        <Popup>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Kabupaten: </td>
                                        <td>{info.kabupaten}</td>
                                    </tr>
                                    <tr>
                                        <td>kasus sembuh: </td>
                                        <td>{info.totalSembuh}</td>
                                    </tr>
                                    <tr>
                                        <td>kasus aktif: </td>
                                        <td>{info.totalAktif}</td>
                                    </tr>
                                    <tr>
                                        <td>kasus meninggal: </td>
                                        <td>{info.totalMeninggal}</td>
                                    </tr>
                                    <tr>
                                        <td>update: </td>
                                        <td>{info.lastUpdate.replace(/T/g, ' ').replace(/Z/g, ' ')}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default HomeContainer
