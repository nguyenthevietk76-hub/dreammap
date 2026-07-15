import { useState } from 'react';
import { motion } from 'framer-motion';
import SchoolCluster from './SchoolCluster';
import styles from './VietnamMap.module.css';

// Mock data for schools
const MOCK_SCHOOLS = [
  { id: 's1', name: 'Điểm trường Nậm Mười', province: 'Yên Bái', x: 30, y: 15, dreamCount: 12, hasNew: true },
  { id: 's2', name: 'Điểm trường Trạm Tấu', province: 'Yên Bái', x: 32, y: 18, dreamCount: 5, hasNew: false },
  { id: 's3', name: 'Điểm trường Mèo Vạc', province: 'Hà Giang', x: 45, y: 5, dreamCount: 24, hasNew: false },
];

export default function VietnamMap({ onClusterClick }) {
  const [schools, setSchools] = useState(MOCK_SCHOOLS);

  return (
    <div className={styles.mapContainer}>
      {/* Simplified Stylized SVG Map for MVP */}
      <svg viewBox="0 0 100 100" className={styles.svgMap} preserveAspectRatio="xMidYMid meet">
        <path 
          d="M20,10 Q35,5 50,15 T45,35 Q60,45 65,60 T70,80 Q50,90 45,85 T30,65 Q10,40 20,10 Z" 
          className={styles.mapPath}
        />
        <text x="35" y="45" className={styles.mapLabel}>Việt Nam</text>
      </svg>
      
      {/* Clusters overlay */}
      <div className={styles.clustersOverlay}>
        {schools.map(school => (
          <SchoolCluster 
            key={school.id}
            school={school}
            onClick={() => onClusterClick(school)}
          />
        ))}
      </div>
    </div>
  );
}
