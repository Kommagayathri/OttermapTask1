import { useState, useEffect, useRef } from "react";
import OLMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Draw, Modify } from "ol/interaction";
import { Fill, Stroke, Style } from "ol/style";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { useNavigate } from "react-router-dom";

function Button({ text, onClick }) {
  return (
    <button
      className="border-primary text-primary hover:bg-primary cursor-pointer rounded-lg border-2 bg-white px-2 py-1 font-mono text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:text-white sm:rounded-xl sm:px-5 sm:py-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default function Map({ name }) {
  const [btnFn, setBtnFn] = useState(null);
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(new VectorSource());
  const drawCursorRef = useRef(null);
  const editCursorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) navigate("/");
    const mapLayer = new TileLayer({
      source: new OSM(),
    });

    const polygonLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({ color: "rgba(4,71,30,0.5)" }),
        stroke: new Stroke({ color: "#04471e", width: 2 }),
      }),
    });

    const newMap = new OLMap({
      target: "map",
      layers: [mapLayer, polygonLayer],
      view: new View({ center: [8750000, 2575000], zoom: 5 }),
      controls: [],
    });

    setMap(newMap);
    setVectorSource(vectorSource);

    return () => newMap.setTarget(null);
  }, []);

  function handleDrawPolygon() {
    if (editCursorRef.current) map.removeInteraction(editCursorRef.current);
    if (btnFn === "draw") {
      setBtnFn(null);
      if (drawCursorRef.current) {
        map.removeInteraction(drawCursorRef.current);
        drawCursorRef.current = null;
      }
      return;
    }
    setBtnFn("draw");
    drawCursorRef.current = new Draw({
      source: vectorSource,
      type: "Polygon",
    });
    map.addInteraction(drawCursorRef.current);
  }

  function handleEditPolygon() {
    if (drawCursorRef.current) map.removeInteraction(drawCursorRef.current);
    if (btnFn === "edit") {
      setBtnFn(null);
      if (editCursorRef.current) {
        map.removeInteraction(editCursorRef.current);
        editCursorRef.current = null;
      }
      return;
    }
    setBtnFn("edit");
    editCursorRef.current = new Modify({
      source: vectorSource,
    });
    map.addInteraction(editCursorRef.current);
  }

  function handleDeletePolygon() {
    return vectorSource.clear();
  }

  function handleZoomIn() {
    return map.getView().setZoom(map.getView().getZoom() + 1);
  }

  function handleZoomOut() {
    return map.getView().setZoom(map.getView().getZoom() - 1);
  }

  return (
    <section className="flex h-9/10 flex-col">
      <h2 className="bg-primary w-full p-3 text-center font-mono text-2xl text-white shadow-lg sm:p-3 sm:text-3xl">
        Welcome {name}
      </h2>
      <div className="flex-1">
        <div className="flex h-full flex-col">
          <div className="z-5 flex items-center justify-center gap-2 p-2 shadow-[0_10px_10px_rgba(0,0,0,0.4)] sm:gap-5 sm:px-5">
            <button
              className={`border-primary hover:bg-primary cursor-pointer rounded-lg border-2 px-2 py-1 font-mono text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:text-white sm:rounded-xl sm:px-5 sm:py-2 ${btnFn === "draw" ? "bg-primary text-white" : "text-primary bg-white"}`}
              onClick={handleDrawPolygon}
            >
              Draw
            </button>
            <button
              className={`border-primary hover:bg-primary cursor-pointer rounded-lg border-2 px-2 py-1 font-mono text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:text-white sm:rounded-xl sm:px-5 sm:py-2 ${btnFn === "edit" ? "bg-primary text-white" : "text-primary bg-white"}`}
              onClick={handleEditPolygon}
            >
              Edit
            </button>
            <Button text="Remove All" onClick={handleDeletePolygon} />
            <Button text="Zoom In" onClick={handleZoomIn} />
            <Button text="Zoom Out" onClick={handleZoomOut} />
          </div>
          <div id="map" className="flex-1"></div>
          <div className="bg-primary absolute bottom-0 rounded-tr-2xl px-4 py-1 text-center text-sm font-medium text-white">
            © OpenStreetMap contributors.
          </div>
        </div>
      </div>
    </section>
  );
}