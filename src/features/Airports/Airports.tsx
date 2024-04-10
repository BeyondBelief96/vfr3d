import * as featureServiceTools from '@esri/arcgis-rest-feature-service';
import * as requestTools from '@esri/arcgis-rest-request';
import { ArcGisMapService, GeoJsonDataSource } from 'cesium';
import { useEffect, useState } from 'react';
import { GeoJsonDataSource as ResiumGeoJsonDataSource } from 'resium';
import { ARCGIS_FAA_AIRPORTS_SERVICE_URL } from '../../utility/constants';

const Airports: React.FC = () => {
  const [airportsDataSource, setAirportsDataSource] = useState<GeoJsonDataSource | null>(null);
  
  useEffect(() => {
    async function fetchAirportData() {
      const authentication = requestTools.ApiKeyManager.fromKey(
        import.meta.env.VITE_ARCGIS_API_KEY
      );
      featureServiceTools
        .queryFeatures({
          url: ARCGIS_FAA_AIRPORTS_SERVICE_URL,
          authentication,
          f: 'geojson',
        })
        .then(async (response) => {
          const data: GeoJsonDataSource = await GeoJsonDataSource.load(response, {
            clampToGround: true,
          });

          console.log(data);

          setAirportsDataSource(data);
        });
    }
    fetchAirportData();
  }, []);

  return <ResiumGeoJsonDataSource data={airportsDataSource} />;
};

export async function loader() {}

export default Airports;
