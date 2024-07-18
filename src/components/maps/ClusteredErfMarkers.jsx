import {InfoWindow, useMap} from '@vis.gl/react-google-maps';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Marker, MarkerClusterer} from '@googlemaps/markerclusterer';
// import {erf} from './erfs';
import {MapErfMarker} from './ErfMapMarker';

/**
 * The ClusterederfMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredErfMarkers = () => {

	const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)

	const erfs = useMemo(() => erfsContext?.erfs, [erfsContext?.erfs]);
	// console.log(`erfs`, erfs);

  const [markers, setMarkers] = useState>({});
  const [selectedErfKey, setSelectedErfKey] = useState(null);

  const selectedErf = useMemo(
    () =>
      erfs && selectedErfKey
        ? erfs.find(erf => erf.key === selectedErfKey)
        : null,
    [erfs, selectedErfKey]
  );

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({map});
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker, key) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return {...markers, [key]: marker};
      } else {
        const {[key]: _, ...newMarkers} = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedErfKey(null);
  }, []);

  const handleMarkerClick = useCallback((erf) => {
    setSelectedErfKey(erf.key);
  }, []);

  return (
    <>
      {erfs.map(erf => (
        <ErfMarker
          key={erf.key}
          erf={erf}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedErfKey && (
        <InfoWindow
          anchor={markers[selectedErfKey]}
          onCloseClick={handleInfoWindowClose}>
          {selectedErf?.ErfNo}
        </InfoWindow>
      )}
    </>
  );
};