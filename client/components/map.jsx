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
import { PlayBtnFill, PauseBtnFill } from 'react-bootstrap-icons';
import styles from '../styles/AudioPlayer.module.css';

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

  // show posted markers for soundscapes
  const [markers, setMarkers] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const [isPlaying, setIsPlaying] = React.useState(false); // for audio player

  const audioPlayer = React.useRef();

  const togglePlayPause = () => {
    const prevValue = isPlaying;

    setIsPlaying(!prevValue);
    if (prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  React.useEffect(() => {
    fetch('/api/soundscapes')
      .then(response => response.json())
      .then(markers => {
        setMarkers(markers);
      })
      .catch(err => console.error('Fetch Failed!', err));
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

  return <div>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
    onClick={onMapClick}
    onLoad={onMapLoad}
    >
      {markers.map(markers => (
        <Marker
          key={markers.soundscapeId}
          position={{ lat: markers.lat, lng: markers.lng }}
        onClick={() => {
          setSelectedMarker(markers);
        }}
        />
      ))}

      {selectedMarker &&
          <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => { setSelectedMarker(null); }}>
            <div>
              <h5>Title: {selectedMarker.title}</h5>
              <p>Description: {selectedMarker.description}</p>
              <div className={styles.player}>
                <audio ref={audioPlayer} src={selectedMarker.fileUrl}></audio>
                <button size='sm' className={styles.circle} onClick={togglePlayPause}>
                  {isPlaying
                    ? <PauseBtnFill className={styles.play}/>
                    : <PlayBtnFill className={styles.pause} />
                  }
                </button>
              </div>
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
            onCloseClick={() => {
              setSelected(null);
            }}>
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
        <SoundscapeForm marker={marker[0]} />
      </ Modal.Body>
    </Modal>

  </div>;
}
