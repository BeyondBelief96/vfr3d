import { SESClient } from '@aws-sdk/client-ses';

export const sesClient = new SESClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY ?? '',
  },
});
