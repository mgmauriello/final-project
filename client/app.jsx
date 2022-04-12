// import Home from './pages/home';
import React, { useRef, useEffect } from 'react';
import Search from '@arcgis/core/widgets/Search';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Config from '@arcgis/core/config';

import './app.css';

Config.apiKey = 'AAPK3480a78e4f134cf88ef097abb200eb1eQR9IP6Sv5iSTgbzlt3yhDJ3vIVwSkDJlcnTbcIJ0iWaNCu_L4blv6qKOXbjQrwF5';

function App() {

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
    }
  }, []);

  return <div className="map-div" ref={mapDiv}></div>;
}

export default App;
