import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import AudioPlayer from './audio-player';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import ReactDOM from 'react-dom';
import SoundscapeForm from './soundscape-form';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = { lat: 37.4419, lng: -122.1419 };

let counter = 1;

export default function Map(props) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [marker, setMarker] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [showModal, setModal] = React.useState(false);

  // setting a singular marker
  const onMapClick = React.useCallback(event => {
    setMarker(current => [{
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      locationId: counter++
    }]);
  }, []);

  // show posted markers for soundscapes
  const [soundscapeMarkers, setMarkers] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/soundscapes')
      .then(response => response.json())
      .then(soundscapeMarkers => {
        setMarkers(soundscapeMarkers);
      })
      .catch(err => console.error('Fetch Failed!', err));
  }, []);

  // Passes a callback with GeoLocate button to be rendered into map
  const onMapLoad = React.useCallback(map => {
    const locateDiv = document.createElement('div');
    locateDiv.style = 'padding: 10px';

    const locatePosition = window.google.maps.ControlPosition.TOP_RIGHT;
    ReactDOM.render(<GeoLocate map={map} />, locateDiv);
    map.controls[locatePosition].push(locateDiv);
  }, []);

  // Use Geolocation to locate the user's location
  function GeoLocate({ map }) {
    return (
      <Button className='geolocate' size='sm' type="button" onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          map.setZoom(14);
        }, () => null);
      }}
      >
      <p className='locate-text'>{'Find me!'}</p>
      </Button>
    );
  }

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const handleAddSoundscapeClick = () => {
    setModal(true);
  };

  return (
    <div>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={center}
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        <GeoLocate />

        {soundscapeMarkers.map(soundscapeMarkers => (
          <Marker
            key={soundscapeMarkers.soundscapeId}
            position={{ lat: soundscapeMarkers.lat, lng: soundscapeMarkers.lng }}
            onClick={() => {
              setSelectedMarker(soundscapeMarkers);
            }}
          />
        ))}

        {selectedMarker &&
            <InfoWindow
            options={{ maxWidth: 345 }}
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => { setSelectedMarker(null); }}>
              <div>
                <h5>Title: {selectedMarker.title}</h5>
                <p>Description: {selectedMarker.description}</p>
                  <AudioPlayer src={selectedMarker.fileUrl} />
              </div>
            </InfoWindow> }

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
              onCloseClick={() => { setSelected(null); }}
            >
            <div>
            <Button variant='success' onClick={handleAddSoundscapeClick}>Add Soundscape</Button>
            </div>
          </InfoWindow>)
        }

      </GoogleMap>

      <Modal size="lg" show={showModal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title id="soundscape-modal">Create Soundscape</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SoundscapeForm marker={marker[0]} setModal={setModal} />
        </ Modal.Body>
      </Modal>

    </div>
  );
}
