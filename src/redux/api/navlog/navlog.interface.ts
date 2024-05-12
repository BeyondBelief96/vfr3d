import { Waypoint } from '../../../features/Routes/route.interface';

export interface NavigationLeg {
  from_point: Waypoint;
  to_point: Waypoint;
  altitude: number;
  wind_direction: number;
  wind_velocity: number;
  temp_c: number;
  calibrated_air_speed: number;
  true_air_speed: number;
  true_course: number;
  true_heading: number;
  magnetic_heading: number;
  route_total_distance?: number;
  leg_distance: number;
  distance_remaining?: number;
  ground_speed: number;
  estimated_time_enroute: Date;
  estimated_time_arrival: Date;
  actual_time_arrival: Date;
  gallons_per_hour_act: number;
  gallons_per_hour_est: number;
  fuel_burned: number;
  fuel_remaining: number;
}
