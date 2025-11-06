import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Configuration: Fishing spots with YouTube video links
// Only locations where "Mordu de la Pêche" actually filmed episodes
// All video URLs are verified YouTube video IDs from the channel
// NOTE: Many episodes are on Dailymotion, not YouTube - only YouTube videos included here
const fishingSpots = [
  {
    id: 'panama-1',
    name: 'Mordu de la Pêche – Panama',
    coordinates: [8.72, -79.52], // Panama Bay, Pacific Ocean - offshore fishing waters
    youtubeUrl: 'https://www.youtube.com/watch?v=ubyNdyabr3E',
    description: 'Fishing episode filmed in Panama Bay',
    minZoom: 3
  },
  {
    id: 'guyane-1',
    name: 'Mordu de la Pêche – Guyane',
    coordinates: [5.15, -52.15], // Atlantic Ocean, offshore from French Guiana coast
    youtubeUrl: 'https://www.youtube.com/watch?v=OgWpBgUjTv0',
    description: 'Fishing episode filmed in French Guiana',
    minZoom: 3
  },
  {
    id: 'kenya-1',
    name: 'Mordu de la Pêche – Kenya',
    coordinates: [-4.25, 39.85], // Indian Ocean, offshore from Mombasa
    youtubeUrl: 'https://www.youtube.com/watch?v=MIT_fboQlNw',
    description: 'Fishing episode filmed in Kenya',
    minZoom: 3
  },
  {
    id: 'ireland-1',
    name: 'Mordu de la Pêche – Irlande',
    coordinates: [53.45, -6.05], // Irish Sea, offshore from Dublin Bay
    youtubeUrl: 'https://www.youtube.com/watch?v=0UJjxd6ECI0',
    description: 'Fishing episode filmed in Ireland',
    minZoom: 3
  },
  {
    id: 'hawaii-1',
    name: 'Mordu de la Pêche – Hawaï',
    coordinates: [20.95, -156.45], // Pacific Ocean, offshore from Maui
    youtubeUrl: 'https://www.youtube.com/watch?v=5U7bYQlFh0c',
    description: 'Fishing episode filmed in Hawaii',
    minZoom: 3
  },
  {
    id: 'egypt-1',
    name: 'Mordu de la Pêche – Égypte',
    coordinates: [22.5, 32.5], // Lake Nasser, Egypt
    youtubeUrl: 'https://www.youtube.com/watch?v=EmNsSXQ2VNE',
    description: 'Fishing episode filmed in Egypt - Nile perch fishing on Lake Nasser',
    minZoom: 3
  },
  {
    id: 'morocco-1',
    name: 'Mordu de la Pêche – Maroc',
    coordinates: [31.79, -7.09], // Oued Massa, Morocco
    youtubeUrl: 'https://www.youtube.com/watch?v=kanE8fWlQ54',
    description: 'Fishing episode filmed in Morocco - Partie 1, black bass fishing in Berber territory',
    minZoom: 3
  },
  {
    id: 'morocco-2',
    name: 'Mordu de la Pêche – Maroc (Partie 2)',
    coordinates: [31.79, -7.09], // Oued Massa, Morocco
    youtubeUrl: 'https://www.youtube.com/watch?v=H5e2oP5T0C8',
    description: 'Fishing episode filmed in Morocco - Partie 2',
    minZoom: 3
  },
  {
    id: 'guyane-2',
    name: 'Mordu de la Pêche – Guyane (Partie 2)',
    coordinates: [5.15, -52.15], // Atlantic Ocean, offshore from French Guiana coast
    youtubeUrl: 'https://www.youtube.com/watch?v=JixP7PcfvCQ',
    description: 'Fishing episode filmed in French Guiana - Partie 2',
    minZoom: 3
  },
  {
    id: 'mexico-1',
    name: 'Mordu de la Pêche – Mexique',
    coordinates: [24.14, -110.30], // Baja California, Mexico - Sea of Cortez
    youtubeUrl: 'https://www.youtube.com/watch?v=DDH3SrhLc_o',
    description: 'Fishing episode filmed in Mexico - Partie 1',
    minZoom: 3
  },
  {
    id: 'mexico-2',
    name: 'Mordu de la Pêche – Mexique (Mer de Cortès)',
    coordinates: [24.14, -110.30], // Sea of Cortez, Mexico
    youtubeUrl: 'https://www.youtube.com/watch?v=eun0WsRikI4',
    description: 'Fishing episode filmed in Mexico - Mer de Cortès, Partie 1',
    minZoom: 3
  },
  {
    id: 'mexico-3',
    name: 'Mordu de la Pêche – Mexique (Mer de Cortès Partie 2)',
    coordinates: [24.14, -110.30], // Sea of Cortez, Mexico
    youtubeUrl: 'https://www.youtube.com/watch?v=zUkpZJ8_M64',
    description: 'Fishing episode filmed in Mexico - Mer de Cortès, Partie 2',
    minZoom: 3
  },
  {
    id: 'gabon-1',
    name: 'Mordu de la Pêche – Gabon',
    coordinates: [0.39, 9.45], // Gabon coast - Atlantic Ocean
    youtubeUrl: 'https://www.youtube.com/watch?v=oM0NcwOTdyY',
    description: 'Fishing episode filmed in Gabon - Partie 1',
    minZoom: 3
  },
  {
    id: 'tahiti-1',
    name: 'Mordu de la Pêche – Tahiti',
    coordinates: [-17.65, -149.43], // Tahiti, French Polynesia
    youtubeUrl: 'https://www.youtube.com/watch?v=tIpsWe266qY',
    description: 'Fishing episode filmed in Tahiti - Partie 1',
    minZoom: 3
  },
  {
    id: 'tahiti-2',
    name: 'Mordu de la Pêche – Tahiti (Partie 2)',
    coordinates: [-17.65, -149.43], // Tahiti, French Polynesia
    youtubeUrl: 'https://www.youtube.com/watch?v=5c4ZDbNy5Y0',
    description: 'Fishing episode filmed in Tahiti - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-lanaudiere-1',
    name: 'Mordu de la Pêche – Lanaudière, Québec',
    coordinates: [46.30, -73.60], // Lanaudière, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=d5r7mK7XniQ',
    description: 'Fishing episode filmed in Lanaudière, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-lanaudiere-2',
    name: 'Mordu de la Pêche – Lanaudière, Québec (Partie 2)',
    coordinates: [46.30, -73.60], // Lanaudière, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=Ie5k-3ffs3c',
    description: 'Fishing episode filmed in Lanaudière, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'hawaii-2',
    name: 'Mordu de la Pêche – Hawaï (Partie 1)',
    coordinates: [20.95, -156.45], // Pacific Ocean, offshore from Maui
    youtubeUrl: 'https://www.youtube.com/watch?v=AnhXVH6OSOU',
    description: 'Fishing episode filmed in Hawaii - Partie 1',
    minZoom: 3
  },
  {
    id: 'guatemala-1',
    name: 'Mordu de la Pêche – Guatemala',
    coordinates: [14.63, -90.51], // Guatemala lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=lEWJcDIvG9g',
    description: 'Fishing episode filmed in Guatemala - Partie 1',
    minZoom: 3
  },
  {
    id: 'guatemala-2',
    name: 'Mordu de la Pêche – Guatemala (Partie 2)',
    coordinates: [14.63, -90.51], // Guatemala lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=w1Q_JDbMsrY',
    description: 'Fishing episode filmed in Guatemala - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-gaspesie-1',
    name: 'Mordu de la Pêche – Gaspésie, Québec',
    coordinates: [48.83, -64.48], // Gaspésie, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=EH6wckRwfzs',
    description: 'Fishing episode filmed in Gaspésie, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-gaspesie-2',
    name: 'Mordu de la Pêche – Gaspésie, Québec (Partie 2)',
    coordinates: [48.83, -64.48], // Gaspésie, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=E_KqO4c-Gmg',
    description: 'Fishing episode filmed in Gaspésie, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'marquesas-1',
    name: 'Mordu de la Pêche – Îles Marquises',
    coordinates: [-9.78, -139.08], // Marquesas Islands, French Polynesia
    youtubeUrl: 'https://www.youtube.com/watch?v=L-NzoD2A_MY',
    description: 'Fishing episode filmed in Îles Marquises - Partie 1',
    minZoom: 3
  },
  {
    id: 'marquesas-2',
    name: 'Mordu de la Pêche – Îles Marquises (Partie 2)',
    coordinates: [-9.78, -139.08], // Marquesas Islands, French Polynesia
    youtubeUrl: 'https://www.youtube.com/watch?v=yVAhRfaXGtU',
    description: 'Fishing episode filmed in Îles Marquises - Partie 2',
    minZoom: 3
  },
  {
    id: 'southafrica-1',
    name: 'Mordu de la Pêche – Afrique du Sud',
    coordinates: [-33.92, 18.42], // South Africa coast
    youtubeUrl: 'https://www.youtube.com/watch?v=KKQNj3THGzE',
    description: 'Fishing episode filmed in South Africa - Partie 1',
    minZoom: 3
  },
  {
    id: 'southafrica-2',
    name: 'Mordu de la Pêche – Afrique du Sud (Partie 2)',
    coordinates: [-33.92, 18.42], // South Africa coast
    youtubeUrl: 'https://www.youtube.com/watch?v=qtOVT-jCCho',
    description: 'Fishing episode filmed in South Africa - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-stlaurent-1',
    name: 'Mordu de la Pêche – Golfe du St-Laurent, Québec',
    coordinates: [48.50, -64.20], // Gulf of St. Lawrence, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=U0QM5Chy01c',
    description: 'Fishing episode filmed in Golfe du St-Laurent, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-stlaurent-2',
    name: 'Mordu de la Pêche – Golfe du St-Laurent, Québec (Partie 2)',
    coordinates: [48.50, -64.20], // Gulf of St. Lawrence, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=UoMRTxdPu-s',
    description: 'Fishing episode filmed in Golfe du St-Laurent, Quebec',
    minZoom: 3
  },
  {
    id: 'quebec-baiejames-1',
    name: 'Mordu de la Pêche – Baie James, Québec',
    coordinates: [52.00, -78.00], // Baie-James, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=yAluVxlrAO4',
    description: 'Fishing episode filmed in Baie James, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-baiejames-2',
    name: 'Mordu de la Pêche – Baie James, Québec (Partie 2)',
    coordinates: [52.00, -78.00], // Baie-James, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=d51Yt3MJeY8',
    description: 'Fishing episode filmed in Baie James, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-baiejames-3',
    name: 'Mordu de la Pêche – Baie-James, Québec',
    coordinates: [52.00, -78.00], // Baie-James, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=F0aYSk0ZCOk',
    description: 'Fishing episode filmed in Baie-James, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-baiejames-4',
    name: 'Mordu de la Pêche – Baie-James, Québec (Partie 2)',
    coordinates: [52.00, -78.00], // Baie-James, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=IQi9SOmIKmQ',
    description: 'Fishing episode filmed in Baie-James, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'usa-northeast-1',
    name: 'Mordu de la Pêche – Nord-Est des États-Unis',
    coordinates: [40.71, -74.01], // Northeast USA
    youtubeUrl: 'https://www.youtube.com/watch?v=pargQ3ibFOU',
    description: 'Fishing episode filmed in Northeast USA - Partie 1',
    minZoom: 3
  },
  {
    id: 'usa-northeast-2',
    name: 'Mordu de la Pêche – Nord-Est des États-Unis (Partie 2)',
    coordinates: [40.71, -74.01], // Northeast USA
    youtubeUrl: 'https://www.youtube.com/watch?v=68CV_REB77M',
    description: 'Fishing episode filmed in Northeast USA - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-cotenord-1',
    name: 'Mordu de la Pêche – Côte-Nord, Québec',
    coordinates: [50.22, -66.38], // Côte-Nord, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=Ql5YDpfzZdk',
    description: 'Fishing episode filmed in Côte-Nord, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-cotenord-2',
    name: 'Mordu de la Pêche – Côte-Nord, Québec (Partie 2)',
    coordinates: [50.22, -66.38], // Côte-Nord, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=3M_Sno6uPl4',
    description: 'Fishing episode filmed in Côte-Nord, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-1',
    name: 'Mordu de la Pêche – Québec',
    coordinates: [46.81, -71.21], // Quebec City area, Saint Lawrence River
    youtubeUrl: 'https://www.youtube.com/watch?v=tDleFmBOynE',
    description: 'Fishing episode filmed in Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-2',
    name: 'Mordu de la Pêche – Québec (Partie 2)',
    coordinates: [46.81, -71.21], // Quebec City area, Saint Lawrence River
    youtubeUrl: 'https://www.youtube.com/watch?v=PaCY2SqPTp4',
    description: 'Fishing episode filmed in Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-3',
    name: 'Mordu de la Pêche – Québec (Partie 1)',
    coordinates: [46.81, -71.21], // Quebec City area, Saint Lawrence River
    youtubeUrl: 'https://www.youtube.com/watch?v=DHfTk_wH3yU',
    description: 'Fishing episode filmed in Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-4',
    name: 'Mordu de la Pêche – Québec (Partie 2)',
    coordinates: [46.81, -71.21], // Quebec City area, Saint Lawrence River
    youtubeUrl: 'https://www.youtube.com/watch?v=8_ibWGj3WaI',
    description: 'Fishing episode filmed in Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'nicaragua-1',
    name: 'Mordu de la Pêche – Nicaragua',
    coordinates: [12.14, -86.25], // Nicaragua lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=jCZ29SgRdYE',
    description: 'Fishing episode filmed in Nicaragua - Partie 1',
    minZoom: 3
  },
  {
    id: 'nicaragua-2',
    name: 'Mordu de la Pêche – Nicaragua (Partie 2)',
    coordinates: [12.14, -86.25], // Nicaragua lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=xpBC7ZxgTTY',
    description: 'Fishing episode filmed in Nicaragua - Partie 2',
    minZoom: 3
  },
  {
    id: 'nicaragua-3',
    name: 'Mordu de la Pêche – Nicaragua (Partie 1)',
    coordinates: [12.14, -86.25], // Nicaragua lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=7Ufa19l_Hmw',
    description: 'Fishing episode filmed in Nicaragua - Partie 1',
    minZoom: 3
  },
  {
    id: 'nicaragua-4',
    name: 'Mordu de la Pêche – Nicaragua (Partie 2)',
    coordinates: [12.14, -86.25], // Nicaragua lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=QUk1VSyNAIM',
    description: 'Fishing episode filmed in Nicaragua - Partie 2',
    minZoom: 3
  },
  {
    id: 'brazil-1',
    name: 'Mordu de la Pêche – Brésil',
    coordinates: [-3.47, -62.22], // Amazon River, Brazil
    youtubeUrl: 'https://www.youtube.com/watch?v=f7LJ9wRZ0ic',
    description: 'Fishing episode filmed in Brazil - Partie 1',
    minZoom: 3
  },
  {
    id: 'brazil-2',
    name: 'Mordu de la Pêche – Brésil (Partie 2)',
    coordinates: [-3.47, -62.22], // Amazon River, Brazil
    youtubeUrl: 'https://www.youtube.com/watch?v=-ixMRxcvexo',
    description: 'Fishing episode filmed in Brazil - Partie 2',
    minZoom: 3
  },
  {
    id: 'brazil-3',
    name: 'Mordu de la Pêche – Brésil (Partie 1)',
    coordinates: [-3.47, -62.22], // Amazon River, Brazil
    youtubeUrl: 'https://www.youtube.com/watch?v=dJpqW5MRofo',
    description: 'Fishing episode filmed in Brazil - Partie 1',
    minZoom: 3
  },
  {
    id: 'brazil-4',
    name: 'Mordu de la Pêche – Brésil (Partie 2)',
    coordinates: [-3.47, -62.22], // Amazon River, Brazil
    youtubeUrl: 'https://www.youtube.com/watch?v=N9qhoDI-Tds',
    description: 'Fishing episode filmed in Brazil - Partie 2',
    minZoom: 3
  },
  {
    id: 'canada-greatlakes-1',
    name: 'Mordu de la Pêche – Grands Lacs (Canada)',
    coordinates: [45.00, -81.00], // Great Lakes, Canada
    youtubeUrl: 'https://www.youtube.com/watch?v=bpb-2Lqz4w0',
    description: 'Fishing episode filmed in Grands Lacs, Canada - Partie 1',
    minZoom: 3
  },
  {
    id: 'canada-greatlakes-2',
    name: 'Mordu de la Pêche – Grands Lacs (Canada) (Partie 2)',
    coordinates: [45.00, -81.00], // Great Lakes, Canada
    youtubeUrl: 'https://www.youtube.com/watch?v=hCOjZuTOjrU',
    description: 'Fishing episode filmed in Grands Lacs, Canada - Partie 2',
    minZoom: 3
  },
  {
    id: 'bahamas-1',
    name: 'Mordu de la Pêche – Bahamas',
    coordinates: [25.03, -77.40], // Bahamas
    youtubeUrl: 'https://www.youtube.com/watch?v=XjLLFpKoS-E',
    description: 'Fishing episode filmed in Bahamas - Partie 1',
    minZoom: 3
  },
  {
    id: 'bahamas-2',
    name: 'Mordu de la Pêche – Bahamas (Partie 2)',
    coordinates: [25.03, -77.40], // Bahamas
    youtubeUrl: 'https://www.youtube.com/watch?v=ziUv3_Z4-CU',
    description: 'Fishing episode filmed in Bahamas - Partie 2',
    minZoom: 3
  },
  {
    id: 'india-1',
    name: 'Mordu de la Pêche – Inde',
    coordinates: [28.61, 77.21], // India
    youtubeUrl: 'https://www.youtube.com/watch?v=hZtu7bw6kYY',
    description: 'Fishing episode filmed in India - Partie 1',
    minZoom: 3
  },
  {
    id: 'india-2',
    name: 'Mordu de la Pêche – Inde (Partie 2)',
    coordinates: [28.61, 77.21], // India
    youtubeUrl: 'https://www.youtube.com/watch?v=c_okkxJAiOg',
    description: 'Fishing episode filmed in India - Partie 2',
    minZoom: 3
  },
  {
    id: 'andaman-1',
    name: 'Mordu de la Pêche – Îles Andaman',
    coordinates: [11.68, 92.77], // Andaman Islands, India
    youtubeUrl: 'https://www.youtube.com/watch?v=sL_8F6ETAzY',
    description: 'Fishing episode filmed in Îles Andaman - Partie 1',
    minZoom: 3
  },
  {
    id: 'andaman-2',
    name: 'Mordu de la Pêche – Îles Andaman (Partie 2)',
    coordinates: [11.68, 92.77], // Andaman Islands, India
    youtubeUrl: 'https://www.youtube.com/watch?v=_EfEQ4HB5iQ',
    description: 'Fishing episode filmed in Îles Andaman - Partie 2',
    minZoom: 3
  },
  {
    id: 'patagonia-1',
    name: 'Mordu de la Pêche – Patagonie',
    coordinates: [-41.15, -71.31], // Patagonia, Argentina
    youtubeUrl: 'https://www.youtube.com/watch?v=VQQXR6FHEcM',
    description: 'Fishing episode filmed in Patagonie - Partie 1',
    minZoom: 3
  },
  {
    id: 'florida-1',
    name: 'Mordu de la Pêche – Floride',
    coordinates: [25.76, -80.19], // Florida - Everglades
    youtubeUrl: 'https://www.youtube.com/watch?v=XuQxTzF_LAI',
    description: 'Fishing episode filmed in Florida - Partie 1',
    minZoom: 3
  },
  {
    id: 'florida-2',
    name: 'Mordu de la Pêche – Floride (Partie 2)',
    coordinates: [25.76, -80.19], // Florida - Everglades
    youtubeUrl: 'https://www.youtube.com/watch?v=JVgz6XS424o',
    description: 'Fishing episode filmed in Florida - Partie 2',
    minZoom: 3
  },
  {
    id: 'florida-3',
    name: 'Mordu de la Pêche – Floride (Partie 1)',
    coordinates: [25.76, -80.19], // Florida - Everglades
    youtubeUrl: 'https://www.youtube.com/watch?v=4eO2ZEtaJYw',
    description: 'Fishing episode filmed in Florida - Partie 1',
    minZoom: 3
  },
  {
    id: 'florida-4',
    name: 'Mordu de la Pêche – Floride (Partie 2)',
    coordinates: [25.76, -80.19], // Florida - Everglades
    youtubeUrl: 'https://www.youtube.com/watch?v=7uB4DQ8i8bk',
    description: 'Fishing episode filmed in Florida - Partie 2',
    minZoom: 3
  },
  {
    id: 'france-1',
    name: 'Mordu de la Pêche – France',
    coordinates: [43.30, 5.37], // France
    youtubeUrl: 'https://www.youtube.com/watch?v=PvrBR2RwjDw',
    description: 'Fishing episode filmed in France - Partie 1',
    minZoom: 3
  },
  {
    id: 'france-2',
    name: 'Mordu de la Pêche – France (Partie 2)',
    coordinates: [43.30, 5.37], // France
    youtubeUrl: 'https://www.youtube.com/watch?v=RM6mIqvolSc',
    description: 'Fishing episode filmed in France - Partie 2',
    minZoom: 3
  },
  {
    id: 'argentina-1',
    name: 'Mordu de la Pêche – Argentine',
    coordinates: [-34.60, -58.38], // Argentina
    youtubeUrl: 'https://www.youtube.com/watch?v=renIWVA9m2U',
    description: 'Fishing episode filmed in Argentina - Partie 1',
    minZoom: 3
  },
  {
    id: 'argentina-2',
    name: 'Mordu de la Pêche – Argentine (Partie 2)',
    coordinates: [-34.60, -58.38], // Argentina
    youtubeUrl: 'https://www.youtube.com/watch?v=Y7mKBfh_cJs',
    description: 'Fishing episode filmed in Argentina - Partie 2',
    minZoom: 3
  },
  {
    id: 'newyork-1',
    name: 'Mordu de la Pêche – New York',
    coordinates: [40.71, -74.01], // New York City - urban fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=MpCqR1LS3H8',
    description: 'Fishing episode filmed in New York - Partie 1',
    minZoom: 3
  },
  {
    id: 'newyork-2',
    name: 'Mordu de la Pêche – New York (Partie 2)',
    coordinates: [40.71, -74.01], // New York City - urban fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=9D_-aEWPODw',
    description: 'Fishing episode filmed in New York - Partie 2',
    minZoom: 3
  },
  {
    id: 'newyork-3',
    name: 'Mordu de la Pêche – New York (Partie 1)',
    coordinates: [40.71, -74.01], // New York City - urban fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=Z36aNmbNN4Q',
    description: 'Fishing episode filmed in New York - Partie 1',
    minZoom: 3
  },
  {
    id: 'newyork-4',
    name: 'Mordu de la Pêche – New York (Partie 2)',
    coordinates: [40.71, -74.01], // New York City - urban fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=Y2jMw2rVJHo',
    description: 'Fishing episode filmed in New York - Partie 2',
    minZoom: 3
  },
  {
    id: 'costarica-1',
    name: 'Mordu de la Pêche – Costa Rica',
    coordinates: [9.93, -84.08], // Costa Rica coast
    youtubeUrl: 'https://www.youtube.com/watch?v=hiT6lRhWYFQ',
    description: 'Fishing episode filmed in Costa Rica - Partie 1',
    minZoom: 3
  },
  {
    id: 'costarica-2',
    name: 'Mordu de la Pêche – Costa Rica (Partie 2)',
    coordinates: [9.93, -84.08], // Costa Rica coast
    youtubeUrl: 'https://www.youtube.com/watch?v=J-hmZFIGS8k',
    description: 'Fishing episode filmed in Costa Rica - Partie 2',
    minZoom: 3
  },
  {
    id: 'venezuela-1',
    name: 'Mordu de la Pêche – Venezuela',
    coordinates: [8.63, -62.25], // Orinoco Delta, Venezuela
    youtubeUrl: 'https://www.youtube.com/watch?v=ie-2vgb_HXg',
    description: 'Fishing episode filmed in Venezuela - Partie 1',
    minZoom: 3
  },
  {
    id: 'venezuela-2',
    name: 'Mordu de la Pêche – Venezuela (Partie 2)',
    coordinates: [8.63, -62.25], // Orinoco Delta, Venezuela
    youtubeUrl: 'https://www.youtube.com/watch?v=7i0tY5NTQh8',
    description: 'Fishing episode filmed in Venezuela - Partie 2',
    minZoom: 3
  },
  {
    id: 'texas-1',
    name: 'Mordu de la Pêche – Texas',
    coordinates: [29.76, -95.37], // Texas lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=FQRZo1C91Mw',
    description: 'Fishing episode filmed in Texas - Partie 1',
    minZoom: 3
  },
  {
    id: 'texas-2',
    name: 'Mordu de la Pêche – Texas (Partie 2)',
    coordinates: [29.76, -95.37], // Texas lakes and rivers
    youtubeUrl: 'https://www.youtube.com/watch?v=wYE3iU55aZ4',
    description: 'Fishing episode filmed in Texas - Partie 2',
    minZoom: 3
  },
  {
    id: 'ontario-1',
    name: 'Mordu de la Pêche – Ontario',
    coordinates: [43.25, -79.07], // Niagara River and Lake Ontario
    youtubeUrl: 'https://www.youtube.com/watch?v=LgiFABCZBgw',
    description: 'Fishing episode filmed in Ontario - Partie 1',
    minZoom: 3
  },
  {
    id: 'ontario-2',
    name: 'Mordu de la Pêche – Ontario (Partie 2)',
    coordinates: [43.25, -79.07], // Niagara River and Lake Ontario
    youtubeUrl: 'https://www.youtube.com/watch?v=dP2KW5w1QAk',
    description: 'Fishing episode filmed in Ontario - Partie 2',
    minZoom: 3
  },
  {
    id: 'guineabissau-1',
    name: 'Mordu de la Pêche – Guinée-Bissau',
    coordinates: [11.86, -15.60], // Guinea-Bissau, West Africa
    youtubeUrl: 'https://www.youtube.com/watch?v=muN3RW65p6g',
    description: 'Fishing episode filmed in Guinea-Bissau - Partie 1',
    minZoom: 3
  },
  {
    id: 'guineabissau-2',
    name: 'Mordu de la Pêche – Guinée-Bissau (Partie 2)',
    coordinates: [11.86, -15.60], // Guinea-Bissau, West Africa
    youtubeUrl: 'https://www.youtube.com/watch?v=jSp17bJRQQ0',
    description: 'Fishing episode filmed in Guinea-Bissau - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-lagrande-1',
    name: 'Mordu de la Pêche – Rivière La Grande, Québec',
    coordinates: [53.75, -77.50], // La Grande River, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=togDryvXpeM',
    description: 'Fishing episode filmed in Rivière La Grande, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-lagrande-2',
    name: 'Mordu de la Pêche – Rivière La Grande, Québec (Partie 2)',
    coordinates: [53.75, -77.50], // La Grande River, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=YAxrcb8fTto',
    description: 'Fishing episode filmed in Rivière La Grande, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'belize-1',
    name: 'Mordu de la Pêche – Belize',
    coordinates: [17.19, -88.50], // Belize - reefs and inland waters
    youtubeUrl: 'https://www.youtube.com/watch?v=rxwFx2SRw4M',
    description: 'Fishing episode filmed in Belize - Partie 1',
    minZoom: 3
  },
  {
    id: 'belize-2',
    name: 'Mordu de la Pêche – Belize (Partie 2)',
    coordinates: [17.19, -88.50], // Belize - reefs and inland waters
    youtubeUrl: 'https://www.youtube.com/watch?v=ixbFvmnYHt4',
    description: 'Fishing episode filmed in Belize - Partie 2',
    minZoom: 3
  },
  {
    id: 'louisiana-1',
    name: 'Mordu de la Pêche – Louisiane',
    coordinates: [29.95, -90.07], // Louisiana bayous and marshes
    youtubeUrl: 'https://www.youtube.com/watch?v=g0S4BSSS5vQ',
    description: 'Fishing episode filmed in Louisiana - Partie 1',
    minZoom: 3
  },
  {
    id: 'louisiana-2',
    name: 'Mordu de la Pêche – Louisiane (Partie 2)',
    coordinates: [29.95, -90.07], // Louisiana bayous and marshes
    youtubeUrl: 'https://www.youtube.com/watch?v=eMa6jGSLnpQ',
    description: 'Fishing episode filmed in Louisiana - Partie 2',
    minZoom: 3
  },
  {
    id: 'cuba-1',
    name: 'Mordu de la Pêche – Cuba',
    coordinates: [23.11, -82.37], // Havana, Cuba - El Malecon and Rio Hatiguanico
    youtubeUrl: 'https://www.youtube.com/watch?v=IqAngTH3bQ0',
    description: 'Fishing episode filmed in Cuba - Partie 1',
    minZoom: 3
  },
  {
    id: 'cuba-2',
    name: 'Mordu de la Pêche – Cuba (Partie 2)',
    coordinates: [23.11, -82.37], // Havana, Cuba - El Malecon and Rio Hatiguanico
    youtubeUrl: 'https://www.youtube.com/watch?v=miIWEeW2q0c',
    description: 'Fishing episode filmed in Cuba - Partie 2',
    minZoom: 3
  },
  {
    id: 'ireland-2',
    name: 'Mordu de la Pêche – Irlande (Partie 2)',
    coordinates: [53.45, -6.05], // Irish Sea, offshore from Dublin Bay
    youtubeUrl: 'https://www.youtube.com/watch?v=Z2-zdpuePGw',
    description: 'Fishing episode filmed in Ireland - Partie 2',
    minZoom: 3
  },
  {
    id: 'puertorico-1',
    name: 'Mordu de la Pêche – Porto Rico',
    coordinates: [18.22, -66.59], // Puerto Rico - Caribbean waters
    youtubeUrl: 'https://www.youtube.com/watch?v=I34n4D3XWJ0',
    description: 'Fishing episode filmed in Puerto Rico - Partie 1',
    minZoom: 3
  },
  {
    id: 'puertorico-2',
    name: 'Mordu de la Pêche – Porto Rico (Partie 2)',
    coordinates: [18.22, -66.59], // Puerto Rico - Caribbean waters
    youtubeUrl: 'https://www.youtube.com/watch?v=Rb-7VxdfQ4o',
    description: 'Fishing episode filmed in Puerto Rico - Partie 2',
    minZoom: 3
  },
  {
    id: 'honduras-1',
    name: 'Mordu de la Pêche – Honduras',
    coordinates: [15.50, -88.03], // Honduras coastal and inland waters
    youtubeUrl: 'https://www.youtube.com/watch?v=sh5nvfyG4ls',
    description: 'Fishing episode filmed in Honduras - Partie 1',
    minZoom: 3
  },
  {
    id: 'honduras-2',
    name: 'Mordu de la Pêche – Honduras (Partie 2)',
    coordinates: [15.50, -88.03], // Honduras coastal and inland waters
    youtubeUrl: 'https://www.youtube.com/watch?v=7Lgdym8G2hU',
    description: 'Fishing episode filmed in Honduras - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-abitibi-1',
    name: 'Mordu de la Pêche – Abitibi-Témiscamingue, Québec',
    coordinates: [48.23, -79.02], // Abitibi-Témiscamingue, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=ZOIomWV4PXU',
    description: 'Fishing episode filmed in Abitibi-Témiscamingue, Quebec - Partie 1',
    minZoom: 3
  },
  {
    id: 'quebec-abitibi-2',
    name: 'Mordu de la Pêche – Abitibi-Témiscamingue, Québec (Partie 2)',
    coordinates: [48.23, -79.02], // Abitibi-Témiscamingue, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=cj85Odi0ZcI',
    description: 'Fishing episode filmed in Abitibi-Témiscamingue, Quebec - Partie 2',
    minZoom: 3
  },
  {
    id: 'kenya-2',
    name: 'Mordu de la Pêche – Kenya (Partie 2)',
    coordinates: [-4.25, 39.85], // Indian Ocean, offshore from Mombasa
    youtubeUrl: 'https://www.youtube.com/watch?v=G06KMOdJUpM',
    description: 'Fishing episode filmed in Kenya - Partie 2',
    minZoom: 3
  },
  {
    id: 'sweden-1',
    name: 'Mordu de la Pêche – Suède',
    coordinates: [59.33, 18.07], // Southern Sweden - pike fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=1sHRDVP8LY8',
    description: 'Fishing episode filmed in Sweden - Partie 1',
    minZoom: 3
  },
  {
    id: 'sweden-2',
    name: 'Mordu de la Pêche – Suède (Partie 2)',
    coordinates: [59.33, 18.07], // Southern Sweden - pike fishing
    youtubeUrl: 'https://www.youtube.com/watch?v=PIF6WeVAtfQ',
    description: 'Fishing episode filmed in Sweden - Partie 2',
    minZoom: 3
  },
  {
    id: 'quebec-nord-1',
    name: 'Mordu de la Pêche – Nord-du-Québec',
    coordinates: [52.00, -75.00], // Northern Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=Br9aT89Zj70',
    description: 'Fishing episode filmed in Nord-du-Québec',
    minZoom: 3
  },
  {
    id: 'quebec-nunavik-1',
    name: 'Mordu de la Pêche – Nunavik',
    coordinates: [58.10, -68.40], // Nunavik, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=lDg1kJUy6TQ',
    description: 'Fishing episode filmed in Nunavik, Quebec - Arctic char fishing',
    minZoom: 3
  },
  {
    id: 'tanzania-1',
    name: 'Mordu de la Pêche – Tanzanie',
    coordinates: [-6.16, 39.20], // Tanzania coast and lakes
    youtubeUrl: 'https://www.youtube.com/watch?v=4zeZrIzFuFM',
    description: 'Fishing episode filmed in Tanzania',
    minZoom: 3
  },
  {
    id: 'rivierenoire-1',
    name: 'Mordu de la Pêche – Rivière Noire',
    coordinates: [46.40, -72.55], // Rivière Noire, Quebec (likely location based on context)
    youtubeUrl: 'https://www.youtube.com/watch?v=0kOPo4Q_FJ4',
    description: 'Fishing episode filmed in Rivière Noire - Partie 1',
    minZoom: 3
  },
  {
    id: 'rivierenoire-2',
    name: 'Mordu de la Pêche – Rivière Noire (Partie 2)',
    coordinates: [46.40, -72.55], // Rivière Noire, Quebec
    youtubeUrl: 'https://www.youtube.com/watch?v=G1bMSy2j0Iw',
    description: 'Fishing episode filmed in Rivière Noire - Partie 2',
    minZoom: 3
  }
]

// Fix for default marker icons in Leaflet with React
const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Warm orange/amber marker icon for fishing spots
// Using a custom HTML div element styled as a fishing pin
const createRedIcon = () => {
  return L.divIcon({
    className: 'custom-fishing-marker',
    html: '<div style="background-color: #f59e0b; width: 22px; height: 22px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #fff; box-shadow: 0 2px 6px rgba(245,158,11,0.5), 0 0 10px rgba(245,158,11,0.3);"></div><div style="background-color: #f97316; width: 8px; height: 8px; border-radius: 50%; margin: -15px auto 0; border: 1.5px solid #fff;"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22]
  })
}

// Helper function to format video label: COUNTRY - Part X - [VIDEO_ID]
function formatVideoLabel(videoName, videoUrl) {
  // Extract country name - remove "Mordu de la Pêche –" prefix
  let country = videoName
    .replace(/^Mordu de la Pêche\s*[–-]\s*/i, '') // Remove "Mordu de la Pêche –" or "Mordu de la Pêche -"
    .trim()
  
  // Remove Partie information and everything after
  country = country
    .replace(/\s*-\s*Partie\s*\d+.*/i, '') // Remove " - Partie X" and everything after
    .replace(/\s*\(Partie\s*\d+\).*/i, '') // Remove "(Partie X)" and everything after
    .replace(/\s*Partie\s*\d+.*/i, '') // Remove "Partie X" and everything after
    .trim()
  
  // If country still contains dash or em dash, take the first part
  if (country.includes('–')) {
    country = country.split('–')[0].trim()
  }
  if (country.includes('-')) {
    // Only split if it's not part of a multi-word location like "New York" or "Côte-Nord"
    const parts = country.split('-')
    if (parts.length > 1 && parts[0].length > 3) {
      country = parts[0].trim()
    }
  }
  
  // Clean up any remaining extra spaces
  country = country.replace(/\s+/g, ' ').trim()
  
  // Extract Part number
  let partNumber = '1' // Default to Part 1
  const partieMatch = videoName.match(/Partie\s*(\d+)/i)
  if (partieMatch) {
    partNumber = partieMatch[1]
  }
  
  // Extract video ID from URL
  const videoIdMatch = videoUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  const videoId = videoIdMatch ? videoIdMatch[1] : 'unknown'
  
  // Format: COUNTRY - Part X - [VIDEO_ID]
  return `${country} - Part ${partNumber} - ${videoId}`
}

// Helper function to group spots by location (coordinates)
function groupSpotsByLocation(spots) {
  const grouped = {}
  
  spots.forEach(spot => {
    // Create a key from coordinates (rounded to 2 decimal places to group nearby locations)
    const key = `${spot.coordinates[0].toFixed(2)},${spot.coordinates[1].toFixed(2)}`
    
    if (!grouped[key]) {
      grouped[key] = {
        coordinates: spot.coordinates,
        videos: [],
        minZoom: spot.minZoom,
        locationName: spot.name.replace(/ - Partie \d+|\(Partie \d+\)/gi, '').trim()
      }
    }
    
    // Add video to the group with formatted label
    grouped[key].videos.push({
      id: spot.id,
      name: spot.name,
      url: spot.youtubeUrl,
      description: spot.description,
      label: formatVideoLabel(spot.name, spot.youtubeUrl)
    })
    
    // Use the minimum zoom level from all videos at this location
    grouped[key].minZoom = Math.min(grouped[key].minZoom, spot.minZoom)
  })
  
  return Object.values(grouped)
}

// Component to handle zoom changes and show/hide markers
function ZoomBasedMarkers({ spots, onMarkerClick, onZoomChange }) {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())
  const [visibleLocations, setVisibleLocations] = useState([])

  useEffect(() => {
    const updateZoom = () => {
      const currentZoom = map.getZoom()
      setZoom(currentZoom)
      
      // Group spots by location
      const groupedSpots = groupSpotsByLocation(spots)
      
      // Filter locations that should be visible at current zoom level
      const visible = groupedSpots.filter(location => currentZoom >= location.minZoom)
      setVisibleLocations(visible)
      
      // Update parent component with zoom info
      if (onZoomChange) {
        onZoomChange(currentZoom, visible.length)
      }
    }

    // Listen to both zoomend and zoom events for immediate updates
    map.on('zoomend', updateZoom)
    map.on('zoom', updateZoom)
    updateZoom() // Initial check

    return () => {
      map.off('zoomend', updateZoom)
      map.off('zoom', updateZoom)
    }
  }, [map, spots, onZoomChange])

  return (
    <>
      {visibleLocations.map((location, index) => (
        <Marker
          key={`location-${index}-${location.coordinates[0]}-${location.coordinates[1]}`}
          position={location.coordinates}
          icon={createRedIcon()}
          eventHandlers={{
            click: (e) => {
              // Stop event propagation to prevent map click handler
              e.originalEvent.stopPropagation()
            }
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center', padding: '8px', minWidth: '200px' }}>
              <strong style={{ color: '#2a1f0f', fontSize: '14px' }}>🎣 {location.locationName}</strong>
              <br />
              <small style={{ color: '#5a4a3a', fontSize: '11px' }}>
                {location.videos.length} {location.videos.length === 1 ? 'video' : 'videos'} available
              </small>
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {location.videos.map((video, videoIndex) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#f59e0b',
                      display: 'block',
                      padding: '6px 10px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      border: '2px solid rgba(245, 158, 11, 0.3)',
                      fontSize: '12px',
                      transition: 'all 0.2s',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#f97316'
                      e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.25)'
                      e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)'
                      e.target.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#f59e0b'
                      e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.15)'
                      e.target.style.borderColor = 'rgba(245, 158, 11, 0.3)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    ▶ {video.label || formatVideoLabel(video.name, video.url)}
                  </a>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

function FishingMap({ isPreview = false, onFullscreenClick }) {
  const [mapReady, setMapReady] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(3)
  const [visibleMarkers, setVisibleMarkers] = useState(0)

  // Default center: World view (not centered on Panama)
  const defaultCenter = [20, 0] // Center on Africa/Europe area for world view
  const defaultZoom = 3

  const handleMarkerClick = (spot) => {
    console.log('Marker clicked:', spot.name)
  }

  const handleZoomChange = (zoom, visibleCount) => {
    setCurrentZoom(Math.round(zoom))
    setVisibleMarkers(visibleCount)
  }

  const handleMapClick = (e) => {
    // Don't trigger if clicking on map controls or markers
    if (e.target.closest('.leaflet-control-container')) return
    if (e.target.closest('.leaflet-marker-icon')) return
    if (e.target.closest('.leaflet-popup')) return
    if (isPreview && onFullscreenClick) {
      onFullscreenClick()
    }
  }

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'relative', cursor: isPreview ? 'pointer' : 'default' }}
      onClick={handleMapClick}
    >
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        whenReady={() => setMapReady(true)}
      >
        {/* OpenStreetMap tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers that appear based on zoom level */}
        {mapReady && (
          <ZoomBasedMarkers 
            spots={fishingSpots} 
            onMarkerClick={handleMarkerClick}
            onZoomChange={handleZoomChange}
          />
        )}
      </MapContainer>

      {/* Info overlay - only show in fullscreen */}
      {!isPreview && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(42, 31, 15, 0.95)',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            zIndex: 1000,
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#ffe8c8' }}>🎣 Mordu de la Pêche</h3>
          <p style={{ fontSize: '12px', color: '#d4b896', marginBottom: '4px' }}>
            Zoomez pour voir les marqueurs de vidéos de pêche. Cliquez sur un marqueur rouge pour regarder la vidéo.
          </p>
          <p style={{ fontSize: '11px', color: '#a68b5f' }}>
            Total vidéos: {fishingSpots.length} | Localisations: {groupSpotsByLocation(fishingSpots).length}
          </p>
          <p style={{ fontSize: '11px', color: '#a68b5f', marginTop: '4px' }}>
            Zoom actuel: {currentZoom} | Marqueurs visibles: {visibleMarkers}
          </p>
        </div>
      )}
      {isPreview && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            background: 'rgba(42, 31, 15, 0.95)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            zIndex: 1000,
            textAlign: 'center',
            fontSize: '12px',
            color: '#d4b896',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            pointerEvents: 'none'
          }}
        >
          🗺️ Cliquez pour ouvrir la carte en plein écran
        </div>
      )}
    </div>
  )
}

export default FishingMap

