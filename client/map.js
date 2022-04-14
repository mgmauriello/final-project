import React, { useRef, useEffect } from 'react';
import Search from '@arcgis/core/widgets/Search';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Config from '@arcgis/core/config';
import Graphic from '@arcgis/core/Graphic';
// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// import FeatureTemplates from '@arcgis/core/widgets/FeatureTemplates';
// import FeatureForm from '@arcgis/core/widgets/FeatureF';
// import Popup from '@arcgis/core/widgets/Popup';
// import Editor from '@arcgis/core/widgets/Editor';

import './css/app.css';

Config.apiKey = 'AAPK3480a78e4f134cf88ef097abb200eb1eQR9IP6Sv5iSTgbzlt3yhDJ3vIVwSkDJlcnTbcIJ0iWaNCu_L4blv6qKOXbjQrwF5';

function Map() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        portalItem: {
          id: 'aa1d3f80270146208328cf66d022e09c'
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-47.109, 14.945],
        zoom: 4
      });

      const search = new Search({
        view
      });

      view.ui.add(search, 'top-right');

      const basemapToggle = new BasemapToggle({
        view,
        nextBasemap: 'arcgis-imagery'
      });

      view.ui.add(basemapToggle, 'bottom-right');

      view.on('click', event => {
        // Create a graphic and add the geometry and symbol to it
        const graphic = new Graphic({
          geometry: {
            type: 'point',
            latitude: event.mapPoint.latitude,
            longitude: event.mapPoint.longitude
            // spatialReference: view.spatialReference
          },
          symbol: {
            type: 'simple-marker',
            color: [255, 10, 10],
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          }
        });
        view.graphics.removeAll();
        view.graphics.add(graphic);

        search.search(event.mapPoint);
        search.resultGraphicEnabled = false;
      });
    }
  }, []);

  return <div className="map-div" ref={mapDiv}></div>;
}

export default Map;
