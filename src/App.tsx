import { ArcGisBaseMapType, ArcGisMapServerImageryProvider, ArcGisMapService, Ion } from "cesium";
import { useEffect } from "react";
import { ImageryLayer, Viewer } from "resium";

function App() {
  const arcGisApiKey = import.meta.env.ARCGIS_API_KEY;
  const cesiumAccessToken = import.meta.env.CESIUM_API_KEY;

  Ion.defaultAccessToken = cesiumAccessToken;
  ArcGisMapService.defaultAccessToken = arcGisApiKey;
  let arcGisImagery: ArcGisMapServerImageryProvider;
  let vfrImagery: ArcGisMapServerImageryProvider;

  useEffect(() => {
    async function loadImagery() {
      arcGisImagery = await ArcGisMapServerImageryProvider.fromBasemapType(ArcGisBaseMapType.SATELLITE);
      vfrImagery = await ArcGisMapServerImageryProvider.fromUrl("https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/VFR_Sectional/MapServer")
    }
  }, [])
  
  if(!arcGisImagery && !vfrImagery) return null

  return (
    <Viewer
    baseLayer={<ImageryLayer imageryProvider={arcGisImagery} />}
    timeline={false}
    animation={false}
    geocoder={false}
  >

  </Viewer>
  )
}

export default App
