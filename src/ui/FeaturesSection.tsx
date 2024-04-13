import React from 'react';
import { Fade } from 'react-awesome-reveal';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto">
        <Fade triggerOnce direction="up">
          <h2 className="mb-10 text-4xl font-bold text-center">Key Features</h2>
        </Fade>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Fade direction="left">
              <div className="shadow-xl card bg-base-200 h-96">
                <div className="card-body">
                  <h3 className="text-2xl font-semibold card-title">3D Visualization</h3>
                  <p className="mb-4">
                    Experience a truly immersive and interactive way of visualizing VFR Sectionals,
                    TAC Charts, and IFR charts in stunning 3D. Using cutting-edge technology powered
                    by Cesium, we allow you to explore these charts from every angle, providing a
                    new level of depth and clarity.
                  </p>
                </div>
              </div>
            </Fade>
          </SwiperSlide>
          <SwiperSlide>
            <Fade direction="right">
              <div className="shadow-xl card bg-base-200 h-96">
                <div className="card-body">
                  <h3 className="text-2xl font-semibold card-title">Seamless Map Integration</h3>
                  <p className="mb-4">
                    Seamlessly blend your sectional charts with various map options, including
                    OpenStreetMaps and Bing Maps. This comprehensive integration provides a holistic
                    view, combining the detailed chart information with the latest map data for
                    enhanced planning ability!
                  </p>
                </div>
              </div>
            </Fade>
          </SwiperSlide>
          <SwiperSlide>
            <Fade direction="left">
              <div className="shadow-xl card bg-base-200 h-96">
                <div className="card-body">
                  <h3 className="text-2xl font-semibold card-title">
                    Realistic Airspace Visualization
                  </h3>
                  <p className="mb-4">
                    Witness airspace like never before with our experimental 3D airspace
                    visualization feature. Powered by data from{' '}
                    <a
                      href="https://3dairspace.org.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      3dairspace.org.uk
                    </a>
                    , you can now visualize airspace in its true three-dimensional form, enhancing
                    your understanding of complex airspace structures.
                  </p>
                  <a className="btn btn-primary" href="https://3dairspace.org.uk/">
                    Learn More
                  </a>
                </div>
              </div>
            </Fade>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturesSection;
