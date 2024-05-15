import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { NavLogResponseDTO } from 'vfr3d-shared';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#1a202c',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a202c',
    marginBottom: 10,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a202c',
  },
  flightDetails: {
    fontSize: 12,
    marginBottom: 5,
  },
  legSection: {
    marginBottom: 10,
    padding: 10,
  },
  legTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a202c',
  },
  legDetail: {
    fontSize: 12,
    marginBottom: 5,
  },
  legUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 10,
  },
  legDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legDetailsColumn: {
    flexDirection: 'column',
    width: '30%',
    marginBottom: 10,
  },
});

interface NavLogPDFProps {
  navlog: NavLogResponseDTO;
}

export const NavLogPDF: React.FC<NavLogPDFProps> = ({ navlog }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const formatTotalRouteTime = (timeInHours: number): string => {
    if (timeInHours < 1) {
      const minutes = Math.round(timeInHours * 60);
      return `${minutes} min`;
    } else {
      const hours = Math.floor(timeInHours);
      const minutes = Math.round((timeInHours - hours) * 60);
      return `${hours} hr ${minutes} min`;
    }
  };

  const formatData = (data: number | undefined): string => {
    return data ? data.toFixed(0) : '---';
  };

  if (navlog.legs?.length === 0) return;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>VFR3D Generated Nav Log</Text>
        <View style={styles.underline} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Details</Text>
          <Text style={styles.flightDetails}>
            Route: {navlog.legs[0].legStartPoint?.name} to{' '}
            {navlog.legs[navlog.legs.length - 1].legEndPoint?.name}
          </Text>
          <Text style={styles.flightDetails}>
            Departure Time: {formatDate(navlog.legs[0].startLegTime.toString())}
          </Text>
          <Text style={styles.flightDetails}>
            Total Route Time: {formatTotalRouteTime(navlog.totalRouteTimeHours)}
          </Text>
          <Text style={styles.flightDetails}>
            Total Distance: {navlog.totalRouteDistance.toFixed(1)} nm
          </Text>
          <Text style={styles.flightDetails}>
            Planned Cruising Altitude: {navlog.legs[0].legEndPoint.altitude} ft
          </Text>
          <View style={styles.underline} />
        </View>
        <View style={styles.section}>
          {navlog.legs.map((leg, index) => (
            <View key={index} style={styles.legSection}>
              <Text style={styles.legTitle}>
                Leg {index + 1}: {leg.legStartPoint?.name} to {leg.legEndPoint?.name}
              </Text>
              <View style={styles.legDetailsContainer}>
                <View style={styles.legDetailsColumn}>
                  <Text style={styles.legDetail}>
                    Leg Distance: {leg.legDistance.toFixed(1)} nm
                  </Text>
                  <Text style={styles.legDetail}>
                    Distance Remaining: {leg.distanceRemaining.toFixed(1)} nm
                  </Text>
                  <Text style={styles.legDetail}>True Course: {formatData(leg.trueCourse)}°</Text>
                  <Text style={styles.legDetail}>
                    Magnetic Course: {formatData(leg.magneticCourse)}°
                  </Text>
                  <Text style={styles.legDetail}>
                    Magnetic Heading: {formatData(leg.magneticHeading)}°
                  </Text>
                </View>
                <View style={styles.legDetailsColumn}>
                  <Text style={styles.legDetail}>
                    Ground Speed: {formatData(leg.groundSpeed)} knots
                  </Text>
                  <Text style={styles.legDetail}>Wind Direction: {formatData(leg.windDir)}°</Text>
                  <Text style={styles.legDetail}>
                    Wind Speed: {formatData(leg.windSpeed)} knots
                  </Text>
                  <Text style={styles.legDetail}>Temperature: {formatData(leg.tempC)}°C</Text>
                </View>
                <View style={styles.legDetailsColumn}>
                  <Text style={styles.legDetail}>
                    Leg Start Time: {formatDate(leg.startLegTime.toString())}
                  </Text>
                  <Text style={styles.legDetail}>
                    Leg End Time: {formatDate(leg.endLegTime.toString())}
                  </Text>
                  <Text style={styles.legDetail}>
                    Estimated Fuel Burn: {leg.legFuelBurnGals.toFixed(1)} gals
                  </Text>
                  <Text style={styles.legDetail}>
                    Fuel Remaining: {leg.remainingFuelGals.toFixed(1)} gals
                  </Text>
                </View>
              </View>
              <View style={styles.legUnderline} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
