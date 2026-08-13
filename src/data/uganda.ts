/**
 * Uganda, drawn rather than tiled.
 *
 * A slippy-map library plus raster tiles would mean a JS dependency, a network
 * round trip per tile and a third-party origin — all of it billed to an audience
 * largely on 3G, for a decoration. This is the real national boundary from
 * OpenStreetMap (via Nominatim), Douglas–Peucker simplified from 32265
 * points to 274, projected equirectangular with a cos(lat)
 * correction so the country isn't horizontally stretched. It ships as one path.
 *
 * Park coordinates are sourced per park — Wikipedia for nine, Wikidata for
 * Semuliki, which has no coordinate on its Wikipedia article. None are invented.
 */

export const UGANDA_VIEWBOX = "0 0 100 105.37";

export const UGANDA_PATH =
  "M0 99.91L0.65 100.56L0.4 101.62L0.64 102.34L0.33 103.63L1.92 103.54L2.91 102.75L4.12 103.36L4.12 102.92L4.63 102.17L5.31 103.13L5.73 103.04L5.75 104.28L6.31 105.37L7.79 104.73L8.26 104.09L8.85 104.43L8.82 103.87L9.2 103.46L9.78 103.34L10.12 103.57L10.23 103.18L10.99 102.84L10.99 101.54L11.75 101.58L13.25 99.97L13.52 99.15L14.21 98.91L14.09 98.42L14.35 97.63L15.74 97.67L16.11 97.35L17.59 97.89L18.61 97.6L19.82 97.69L20.73 96.76L21.96 96.21L22.6 96.48L80.34 96.48L80.26 86.48L81.28 80.51L79.92 76.13L82.01 73.13L82.35 72.96L82.61 72.12L83.4 71.65L83.57 71.03L83.2 69.68L83.77 69.14L83.71 68.4L84.11 67.3L85 66.91L85.26 66.51L86.69 66.24L86.7 65.52L87.36 65.18L87.37 64.01L89.2 63.16L89.21 62.57L89.81 62.17L89.91 61.51L90.42 60.8L90.76 58.47L91.19 57.73L92.16 57.8L92.24 56.85L93.52 56.31L93.91 55.78L96.22 55.5L96.88 54.65L96.84 53.9L96.07 52.88L96.43 52.54L96.2 51.99L97.12 51.19L97.49 49.87L97.97 49.38L98.96 48.98L99.83 47.37L100 45.63L100 41.87L99.71 41.45L98.41 33.8L99.15 32.47L98.76 31.67L98.39 31.66L98.04 30.25L97.57 30.66L96.29 29.09L95.86 28.32L95.86 26.66L95.14 25.42L94.5 25L94.33 25.28L93.6 25.19L93.35 24.47L92.61 24.14L92.11 21.06L91.63 20.23L91 20L90.69 20.14L89.97 19.39L89.49 16.43L88.95 15.92L89.24 14.44L88.74 13.68L89.39 13.68L89.89 13.22L90.1 10.41L89.03 9.98L88.83 9.52L88.29 9.2L87.67 9.24L87.24 9.63L86.09 8.3L84.72 8.6L85.04 8.09L84.39 7.87L84.89 7.42L85.73 7.43L85.54 6.51L83.2 6.87L83.25 6.43L83.78 6.14L84.05 5.03L82.67 4.14L82.65 3.8L83.25 3.41L82.48 2.08L82.78 1.66L82.44 1.01L81.34 0L72.56 8.89L66.44 8.39L63.65 6.28L61.32 7.71L57.99 8.59L52.37 9L48.35 11.68L48.75 12.4L48.44 13.44L46.3 12.95L46.32 12.42L45.69 11.83L43.94 12.21L43.93 10.58L42.31 8.28L41.26 7.54L40.95 7.6L41.03 8L39.75 8.86L39.4 9.52L36.93 10.29L35.83 10.98L35.53 10.88L35.66 10.28L31.61 8.06L29.3 8.17L28.14 9.18L27.5 9.1L27.4 9.49L26.7 9.96L26.34 9.71L25.78 10.01L25.35 11.07L24.21 12.53L23.82 13.65L23.5 13.6L23.88 13.94L24.38 13.48L25.21 13.42L25.12 15.39L24.21 16.46L24.31 16.95L23.98 17.12L23.9 17.58L23.31 17.89L22.5 21.47L22.01 21.79L22.25 22.33L23.02 22.67L23.67 23.45L23.66 24.07L24.26 25.36L24.15 26.17L23.69 26.92L23.02 27.36L23.09 27.74L22.75 28.12L22.2 30.05L21.68 30.37L21.9 31.78L21.5 32.83L21.71 33.44L22.2 33.09L23.23 33.31L23.49 34.1L23.94 34.38L24.11 34.9L24.53 35.06L25.11 34.98L25.34 33.93L25.97 33.72L27.66 34.85L27.86 35.48L27.58 35.6L28.6 36.31L28.89 36L29.36 36.1L30.03 35.78L30.03 37.11L31.92 38.29L31.92 39.04L17.99 54.71L17.44 54.71L17.04 55.18L16.99 55.81L16.56 55.72L15.05 56.16L14.49 55.9L14.06 56.84L13.62 56.83L13.25 56.42L12.82 56.62L12.18 57.28L12.35 57.65L11.92 58.62L12.07 59.88L11.81 59.78L11.89 60.09L11.6 59.99L11.6 60.26L11.26 60.29L11.46 60.43L11.17 60.49L10.95 61.07L11.1 61.21L10.82 61.26L10.72 61.71L9.79 61.56L7.66 62.45L7.19 63.7L7.45 64.32L7.02 66.27L7.36 67.04L7.3 67.62L7.53 67.77L7.5 68.53L5.52 70.94L4.61 74.88L3.62 75.03L3 75.75L2.95 76.49L2.63 76.69L2.81 78.11L3.16 78.56L2.88 78.81L2.02 87.2L1.86 87.97L1.48 88.25L1.74 88.66L1.41 89.08L1.67 89.58L0.97 91.1L0.99 92.69L1.25 93.36L0.98 93.94L1.2 94.65L0.16 94.76L0.53 96.13L0.25 96.17L0.06 98.87L0.25 99.36L0 99.91Z";

export interface ParkPoint {
  /** Decimal degrees, for display. */
  lat: number;
  lon: number;
  /** Projected into UGANDA_VIEWBOX space. */
  x: number;
  y: number;
  source: string;
}

export const PARK_POINTS: Record<string, ParkPoint> = {
  "bwindi-impenetrable-national-park": { lat: -1.0167, lon: 29.6833, x: 2.02, y: 96.79, source: "Wikipedia" },
  "mgahinga-gorilla-national-park": { lat: -1.3694, lon: 29.6403, x: 1.23, y: 103.29, source: "Wikipedia" },
  "queen-elizabeth-national-park": { lat: -0.1372, lon: 30.0411, x: 8.62, y: 80.58, source: "Wikipedia" },
  "murchison-falls-national-park": { lat: 2.1875, lon: 31.7814, x: 40.69, y: 37.72, source: "Wikipedia" },
  "kidepo-valley-national-park": { lat: 3.9, lon: 33.85, x: 78.8, y: 6.16, source: "Wikipedia" },
  "kibale-national-park": { lat: 0.5, lon: 30.4, x: 15.23, y: 68.83, source: "Wikipedia" },
  "semuliki-national-park": { lat: 0.8334, lon: 30.0434, x: 8.66, y: 62.68, source: "Wikidata Q1429741" },
  "rwenzori-mountains": { lat: 0.4, lon: 29.95, x: 6.94, y: 70.67, source: "Wikipedia" },
  "mount-elgon-national-park": { lat: 1.1333, lon: 34.5833, x: 92.32, y: 57.16, source: "Wikipedia" },
  "lake-mburo": { lat: -0.6278, lon: 30.9667, x: 25.67, y: 89.62, source: "Wikipedia" },
};

/** "0.5000° N, 30.4000° E" — hemisphere letters, not signs. */
export function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lon).toFixed(4)}° ${ew}`;
}
