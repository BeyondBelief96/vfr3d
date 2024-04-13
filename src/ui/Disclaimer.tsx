import React from 'react';

const DisclaimerSection: React.FC = () => {
  return (
    <div className="py-8 bg-base-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 rounded-lg shadow-md bg-base-300">
          <h4 className="mb-4 text-xl font-bold">Disclaimer and Conditions of Use</h4>
          <p className="mb-4 text-info">
            This website utilizes data and software from various sources, including Cesium, ArcGIS,
            and the Federal Aviation Administration (FAA) Aeronautical Information Services (AIS).
            The use of this data and software is subject to the respective terms, conditions, and
            licenses set forth by each provider.
          </p>
          <p className="mb-4 text-info">
            Cesium: This website uses the Cesium library, which is provided under the Apache 2.0
            license. For more information about Cesium's terms of use and licensing, please refer to
            the{' '}
            <a
              href="https://cesium.com/legal/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Cesium Legal Page
            </a>
            .
          </p>
          <p className="mb-4 text-info">
            ArcGIS: The ArcGIS data and services used on this website are subject to the terms and
            conditions set forth by Esri. For more information about ArcGIS terms of use and
            licensing, please refer to the{' '}
            <a
              href="https://www.esri.com/en-us/legal/terms/full-master-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Esri Master Agreement
            </a>
            .
          </p>
          <p className="mb-4 text-info">
            FAA Data: The FAA data provided on this website is subject to the terms and conditions
            specified by the FAA. For more information about the FAA's data usage policies, please
            refer to the{' '}
            <a
              href="https://adds-faa.opendata.arcgis.com/pages/adds-data-disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              FAA Data Disclaimer
            </a>
            .
          </p>
          <p className="mb-4 text-info">
            Note that the software used to produce the information on this site has not been
            certified for navigational use -- CONSEQUENTLY, THIS INFORMATION SHOULD NOT BE RELIED
            UPON FOR NAVIGATION. Use of this information for any other purpose is solely at the
            user's risk. No warranty, expressed or implied, as to the accuracy or suitability of
            this information for any use is provided.
          </p>
          <p className="mb-4 text-info">
            By using this website, you acknowledge and agree to comply with the terms, conditions,
            and licenses set forth by Cesium, ArcGIS, and the FAA, as well as any additional terms
            and conditions specified by this website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerSection;
