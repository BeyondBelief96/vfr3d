// import { ImageryLayer } from 'resium';
// import { useImageryProviders } from '../../hooks/useImageryProviders';
// import { ARCGIS_FAA_VFR_SECTIONAL_URL } from '../../utility/constants';

// interface VfrImageryLayerProps {
//   arcGisApiKey: string;
// }

// const VfrImageryLayer: React.FC<VfrImageryLayerProps> = ({ arcGisApiKey }) => {
//   const { arcGisImagery, vfrImagery } = useImageryProviders(
//     arcGisApiKey,
//     ARCGIS_FAA_VFR_SECTIONAL_URL
//   );

//   if (!arcGisImagery) {
//     console.warn('ArcGIS imagery provider is not available');
//     return null;
//   }

//   if (!vfrImagery) {
//     console.warn('VFR imagery provider is not available, using ArcGIS imagery as fallback');
//   }

//   return <ImageryLayer imageryProvider={vfrImagery ?? arcGisImagery} />;
// };

// export default VfrImageryLayer;
