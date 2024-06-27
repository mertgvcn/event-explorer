import { React, useState } from 'react'
import { useSelector } from 'react-redux'
//map
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
//components
import Event from "./Event.js"
import CreateEvent from "../pages/AdminPanel/components/CreateEvent.js"
import dayjs from 'dayjs'

const locationIcon = new Icon({
    iconUrl: require("../assets/location_icon.png"),
    iconSize: [48, 48]
})

const unavailableLocationIcon = new Icon({
    iconUrl: require("../assets/unavailable_location_icon.png"),
    iconSize: [48, 48]
})

const Map = () => {
    const role = localStorage.getItem("role")

    const { events, filters } = useSelector(state => state.event)
    var filteredEvents = events
        .filter(event => filters.categories.includes(event.category))
        .filter(event => filters.status == event.isActive)
        .filter(event => {
            if (filters.date.start) {
                return dayjs(event.dateTime).diff(dayjs(filters.date.start)) >= 0
            }
            return true
        })
        .filter(event => {
            if (filters.date.end) {
                return dayjs(event.dateTime).diff(dayjs(filters.date.end)) <= 0
            }
            return true
        })

    const [createEventStatus, setCreateEventStatus] = useState(false)
    const [createEventLocation, setCreateEventLocation] = useState({})

    const LocationFinder = () => {
        useMapEvents({
            dblclick(e) {
                setCreateEventLocation(e.latlng)
                setCreateEventStatus(true)
            },
        });

        return null;
    };
    
    return (
        <>
            <MapContainer
                center={[41.008240, 28.978359]}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                doubleClickZoom={false}
            >
                {role === "admin" && <LocationFinder />}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <MarkerClusterGroup chunkedLoading>
                    {filteredEvents.map((event, idx) => (
                        <Marker position={event.geocode} icon={event.isActive ? locationIcon : unavailableLocationIcon} key={idx}>
                            <Popup minWidth={200}>
                                <Event data={event} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>

            </MapContainer>

            {role === "admin" && <CreateEvent createEventStatus={createEventStatus} setCreateEventStatus={setCreateEventStatus} createEventLocation={createEventLocation} />}
        </>
    )
}

export default Map