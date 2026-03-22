import React, { useState, useCallback, useRef } from "react";
import { 
  GoogleMap, 
  useJsApiLoader, 
  DirectionsService, 
  DirectionsRenderer, 
  Autocomplete, 
  TrafficLayer 
} from "@react-google-maps/api";

const mapOptions = {
  disableDefaultUI: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
  ]
};

const center = { lat: 23.5204, lng: 87.3119 };

const RouteTracker = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_ACTUAL_API_KEY_HERE", 
    libraries: ['places'] 
  });

  const [response, setResponse] = useState(null);
  const [requestRoute, setRequestRoute] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleRouteCalculation = () => {
    if (originRef.current.value && destinationRef.current.value) {
      // Set values and reset response to trigger fresh DirectionsService render
      setOrigin(originRef.current.value);
      setDestination(destinationRef.current.value);
      setResponse(null);
      setRequestRoute(true); 
    }
  };

  const directionsCallback = useCallback((res) => {
    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res);
        setRequestRoute(false); // Stop the service immediately after success
      } else {
        console.error("Route calculation failed:", res.status);
        setRequestRoute(false);
      }
    }
  }, []);

  if (loadError) return <div className="container mt-5 pt-5 alert alert-danger">Map Error: Verify API settings.</div>;
  if (!isLoaded) return <div className="d-flex justify-content-center mt-5 pt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    /* FIX: Use calc(100vh - NavbarHeight) to prevent overlapping.
      Assuming your navbar is 70px.
    */
    <div className="d-flex flex-column theme-transition" style={{ height: "100vh" }}>
      
      {/* Spacer for Fixed Navbar */}
      <div style={{ minHeight: "70px", height: "70px" }}></div>

      {/* Main Dashboard Area */}
      <div className="flex-grow-1 d-flex overflow-hidden bg-light">
        
        {/* LEFT SIDEBAR */}
        <div className="col-lg-4 col-xl-3 bg-white border-end shadow-sm d-flex flex-column">
          
          {/* HEADER */}
          <div className="p-4 border-bottom bg-white">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
              </div>
              <div>
                <h6 className="mb-0 fw-bold">Emergency Transit</h6>
                <small className="text-muted">Route Optimization</small>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4 flex-grow-1 overflow-auto">
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-light">
              <label className="form-label small text-muted fw-bold">Pickup Location</label>
              <Autocomplete>
                <input
                  ref={originRef}
                  className="form-control mb-3 rounded-3 border-0 shadow-sm"
                  placeholder="Enter pickup..."
                />
              </Autocomplete>

              <label className="form-label small text-muted fw-bold">Destination (Hospital)</label>
              <Autocomplete>
                <input
                  ref={destinationRef}
                  className="form-control mb-3 rounded-3 border-0 shadow-sm"
                  placeholder="Search hospital..."
                />
              </Autocomplete>

              <button
                onClick={handleRouteCalculation}
                className="btn btn-primary w-100 rounded-3 fw-bold mt-2 py-2 shadow-sm"
              >
                🚑 Find Fastest Route
              </button>
            </div>

            {/* RESULT CARD */}
            {response && (
              <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-primary border-4 animate-fade-in">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fw-bold mb-0 text-dark">Route Info</h6>
                  <span className="badge bg-success-subtle text-success border border-success-subtle">Fastest</span>
                </div>

                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted small">Estimated Time</span>
                  <span className="fw-bold text-primary">
                    {response.routes[0].legs[0].duration.text}
                  </span>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted small">Total Distance</span>
                  <span className="fw-bold text-dark">
                    {response.routes[0].legs[0].distance.text}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER ACTION */}
          <div className="p-3 border-top bg-white">
            <button className="btn btn-outline-primary w-100 rounded-pill fw-bold">
              <i className="bi bi-share me-2"></i>Send to Driver
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: MAP */}
        <div className="flex-grow-1 position-relative">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={13}
            options={mapOptions}
          >
            <TrafficLayer />

            {requestRoute && (
              <DirectionsService
                options={{
                  origin: origin,
                  destination: destination,
                  travelMode: "DRIVING",
                }}
                callback={directionsCallback}
              />
            )}

            {response && (
              <DirectionsRenderer
                options={{
                  directions: response,
                  polylineOptions: {
                    strokeColor: "#0d6efd",
                    strokeWeight: 6,
                    strokeOpacity: 0.8
                  },
                }}
              />
            )}

            {/* MAP HUD */}
            <div className="position-absolute bottom-0 start-0 m-3 z-1">
              <div className="bg-white px-3 py-2 rounded-pill shadow-sm border small fw-bold text-dark d-flex align-items-center">
                <span className="spinner-grow spinner-grow-sm text-success me-2"></span>
                Live Traffic Active
              </div>
            </div>
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default RouteTracker;