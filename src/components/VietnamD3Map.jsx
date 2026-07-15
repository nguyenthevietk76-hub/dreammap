import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VietnamMap.module.css';
import { MOCK_SCHOOLS } from '../data/mockData';

export default function VietnamD3Map({ onClusterClick, setZoomFn }) {
  const [geoData, setGeoData] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [hoveredSchool, setHoveredSchool] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  
  const currentTransformRef = useRef(d3.zoomIdentity);
  const projectionRef = useRef(null);

  const width = 800;
  const height = 1200;

  // Draw function for Canvas background
  const drawMapCanvas = (t) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !geoData || !projectionRef.current) return;

    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Resize canvas buffer to match screen size * DPR for crispness
    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate aspect ratio meet matching SVG's viewBox (0 0 800 1200)
    const containerRatio = rect.width / rect.height;
    const viewBoxRatio = width / height;

    let scaleFactor, dx = 0, dy = 0;
    if (containerRatio > viewBoxRatio) {
      scaleFactor = rect.height / height;
      dx = (rect.width - width * scaleFactor) / 2;
    } else {
      scaleFactor = rect.width / width;
      dy = (rect.height - height * scaleFactor) / 2;
    }

    ctx.save();
    
    // Scale for device pixel ratio and centered aspect ratio
    ctx.translate(dx * dpr, dy * dpr);
    ctx.scale(scaleFactor * dpr, scaleFactor * dpr);

    // Apply the active D3 zoom transform
    ctx.translate(t.x, t.y);
    ctx.scale(t.k, t.k);

    // Styles matching D3 Map styling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.strokeStyle = 'rgba(6, 214, 160, 0.4)';
    ctx.lineWidth = 1 / t.k; // maintain visual stroke width at 1px
    ctx.lineJoin = 'round';

    ctx.beginPath();
    const canvasPath = d3.geoPath().projection(projectionRef.current).context(ctx);

    geoData.features.forEach(feature => {
      canvasPath(feature);
    });
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    fetch('/vietnam.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading geojson", err));
  }, []);

  // Handle window resizing
  useEffect(() => {
    if (!geoData) return;
    const handleResize = () => {
      drawMapCanvas(currentTransformRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [geoData]);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    // Cache projection
    projectionRef.current = d3.geoMercator().fitExtent([[50, 50], [width - 50, height - 50]], geoData);

    // Initial draw
    drawMapCanvas(currentTransformRef.current);

    // D3 Zoom Setup
    zoomRef.current = d3.zoom()
      .scaleExtent([1, 8]) // Min zoom 1x, Max zoom 8x
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", (e) => {
        currentTransformRef.current = e.transform;
        
        // 1. Redraw Canvas map background
        drawMapCanvas(e.transform);

        // 2. Direct DOM mutation of the SVG zoom layer to bypass React re-render
        d3.select(svgRef.current)
          .select("#zoomable-layer")
          .attr("transform", e.transform.toString());

        // 3. Counter-scale cluster-inner elements to maintain their constant size
        d3.select(svgRef.current)
          .selectAll(".cluster-inner")
          .attr("transform", `scale(${1 / e.transform.k})`);
      });

    const svg = d3.select(svgRef.current);
    svg.call(zoomRef.current);
    
    // Pass zoom controls up if requested
    if (setZoomFn) {
      setZoomFn({
        zoomIn: () => svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.5),
        zoomOut: () => svg.transition().duration(300).call(zoomRef.current.scaleBy, 1/1.5),
        resetZoom: () => svg.transition().duration(750).call(zoomRef.current.transform, d3.zoomIdentity)
      });
    }

    const baseProjection = projectionRef.current;
    let nodes = MOCK_SCHOOLS.map(school => {
      const [x, y] = baseProjection([school.lng, school.lat]);
      const baseRadius = 12; // Minimum radius
      const growthFactor = 4;
      const calculatedRadius = baseRadius + Math.sqrt(school.dreamCount) * growthFactor;
      const r = Math.min(calculatedRadius, 28);
      
      return {
        ...school,
        x, y,
        fx: null, fy: null,
        originalX: x, originalY: y,
        r
      };
    });

    const simulation = d3.forceSimulation(nodes)
      .force("collide", d3.forceCollide().radius(d => d.r + 10).iterations(4))
      .force("x", d3.forceX(d => d.originalX).strength(0.3))
      .force("y", d3.forceY(d => d.originalY).strength(0.3))
      .stop();

    for (let i = 0; i < 120; ++i) simulation.tick();

    setClusters(nodes.map(n => ({ ...n })));

  }, [geoData, setZoomFn]);

  const handleClusterHover = (e, school) => {
    setHoveredSchool(school);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleClusterLeave = () => {
    setHoveredSchool(null);
  };

  if (!geoData) return <div className={styles.loadingMap}>Đang tải bản đồ vũ trụ...</div>;

  return (
    <div className={styles.mapContainer} ref={containerRef}>
      <canvas className={styles.canvasMap} ref={canvasRef} />
      
      <svg 
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`} 
        className={styles.svgMap} 
        preserveAspectRatio="xMidYMid meet"
        style={{ cursor: 'grab' }}
      >
        {/* We completely omit the transform attribute in JSX so React doesn't overwrite mutated DOM attributes */}
        <g id="zoomable-layer">
          {/* Clusters (Pure SVG) */}
          {clusters.map(cluster => (
            <g 
              key={cluster.id}
              className={styles.clusterGroup}
              transform={`translate(${cluster.x},${cluster.y})`}
              onClick={() => onClusterClick(cluster)}
              onMouseEnter={(e) => handleClusterHover(e, cluster)}
              onMouseLeave={handleClusterLeave}
              style={{ cursor: 'pointer' }}
            >
              {/* We omit transform here as well so D3 manages counter-scaling */}
              <g className="cluster-inner">
                
                {/* Pulse Ring if hasNew */}
                {cluster.hasNew && (
                  <motion.circle 
                    r={cluster.r}
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2"
                    animate={{ r: [cluster.r, cluster.r + 10, cluster.r], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Main Circle (Donut style) */}
                <circle 
                  r={cluster.r} 
                  className={styles.clusterDotSvg}
                />
                
                {/* Count Text */}
                <text 
                  textAnchor="middle" 
                  dominantBaseline="central"
                  className={styles.clusterTextSvg}
                >
                  {cluster.dreamCount}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredSchool && (
          <motion.div 
            className={styles.floatingTooltip}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ 
              left: tooltipPos.x + 15, 
              top: tooltipPos.y + 15 
             }}
          >
            <strong>{hoveredSchool.name}</strong>
            <span className={styles.tooltipProvince}>{hoveredSchool.province}</span>
            <span className={styles.tooltipDreams}>{hoveredSchool.dreamCount} ước mơ</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
