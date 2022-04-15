
let map;
let marker;
let infowindow;

function initialize() {
  const latLng = { lat: 37.4419, lng: -122.1419 };
  const mapProp = {
    center: latLng,
    zoom: 5,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP
  };

  map = new window.google.maps.Map(document.getElementById('root'), mapProp);

  window.google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(event.latLng);
  });
}

function placeMarker(location) {
  if (!marker || !marker.setPosition) {
    marker = new window.google.maps.Marker({
      position: location,
      map
    });
  } else {
    marker.setPosition(location);
  }
  if (!!infowindow && !!infowindow.close) {
    infowindow.close();
  }
  infowindow = new window.google.maps.InfoWindow({ content: ' ' });
  window.google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(
      '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Open Modal</button>');
    infowindow.open(map, this);
  });
  window.google.maps.event.trigger(marker, 'click');
}

window.google.maps.event.addDomListener(window, 'load', initialize);
