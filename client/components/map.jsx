import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import SoundscapeForm from './SoundscapeForm';
// import StoredMarker from './StoredMarker';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = { lat: 37.4419, lng: -122.1419 };

let counter = 1;

export default function Map(props) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDS1KOvY-L9vNT8SmKMZmzgYs8UPzCaJMA',
    libraries
  });

  const [marker, setMarker] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [showModal, setModal] = React.useState(false);

  const onMapClick = React.useCallback(event => {
    setMarker(current => [{
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      locationId: counter++
    }]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const handleAddSoundscapeClick = () => {
    setModal(true);
  };
  const savedMarkers = [{ soundscapeId: 3, fileUrl: '', lat: 38.834158324677844, lng: -122.82302912287078 },
    { soundscapeId: 2, fileUrl: '', lat: 37.83387105305894, lng: -122.82266124016441 }];

  return <div>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
    onClick={onMapClick}
    onLoad={onMapLoad}
    >
      {savedMarkers.map(marker => (
        <Marker
          key={marker.soundscapeId}
          position={{ lat: marker.lat, lng: marker.lng }}
        // onClick={() => {
        //   setSelected(marker);
        // }}
        />
      ))}

      {marker.map(marker => (
        <Marker
          key={marker.locationId}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
          />
      ))}
      {selected &&
        (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}>
          <div>
          <Button variant='success' onClick={handleAddSoundscapeClick}>Add Soundscape</Button>
          </div>
      </InfoWindow>)
    }
{/* submitted markers */}
      {/* <StoredMarker /> */}
    </GoogleMap>

    <Modal size="lg" show={showModal} onHide={() => setModal(false)}>
      <Modal.Header>
        <Modal.Title id="soundscape-modal">Create Soundscape</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SoundscapeForm marker={marker[0]} />
      </ Modal.Body>
    </Modal>

  </div>;
}
