import React from 'react';
import { Fade } from 'react-awesome-reveal';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto">
        <Fade triggerOnce direction="up">
          <h2 className="mb-10 text-4xl font-bold text-center">Key Features</h2>
        </Fade>
        <div className="space-y-20">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <Fade direction="left">
              <div className="mockup-window bg-base-300">
                <div className="flex justify-center bg-base-200">
                  <img src="feat1.png" alt="3D Visualization" className="w-full h-full" />
                </div>
              </div>
            </Fade>
            <Fade direction="right">
              <div className="prose">
                <h3 className="text-2xl font-semibold">3D Visualization</h3>
                <p>
                  Experience a truly immersive and interactive way of visualizing VFR Sectionals,
                  TAC Charts, and IFR charts in stunning 3D. Using cutting-edge technology powered
                  by Cesium, we allow you to explore these charts from every angle, providing a new
                  level of depth and clarity.
                </p>
              </div>
            </Fade>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row-reverse">
            <Fade direction="right">
              <div className="mockup-window bg-base-300">
                <div className="flex justify-center bg-base-200">
                  <img src="feat2.png" alt="Seamless Map Integration" />
                </div>
              </div>
            </Fade>
            <Fade direction="left">
              <div className="prose">
                <h3 className="text-2xl font-semibold">Seamless Map Integration</h3>
                <p>
                  Seamlessly blend your sectional charts with various map options, including
                  OpenStreetMaps and Bing Maps. This comprehensive integration provides a holistic
                  view, combining the detailed chart information with the latest map data for
                  enhanced planning ability!
                </p>
              </div>
            </Fade>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <Fade direction="left">
              <div className="mockup-window bg-base-300">
                <div className="flex justify-center bg-base-200">
                  <img src="feat3.png" alt="VFR Navigation Log Generation" />
                </div>
              </div>
            </Fade>
            <Fade direction="right">
              <div className="prose">
                <h3 className="text-2xl font-semibold">VFR Navigation Log Generation</h3>
                <p>
                  Simplify your flight planning with our powerful VFR navigation log generator. By
                  leveraging advanced algorithms and comprehensive aviation weather data, our
                  feature automatically calculates crucial flight information for each leg of your
                  journey.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
