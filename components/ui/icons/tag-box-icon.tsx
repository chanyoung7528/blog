export const TagBoxIcon = ({ width = 20, height = 20, fill = '#676767' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="7.5" height="7.5" rx="2" fill={fill} />
    <rect x="10.5" y="2" width="7.5" height="7.5" rx="2" fill={fill} />
    <rect x="2" y="10.5" width="7.5" height="7.5" rx="2" fill={fill} />
    <rect x="10.5" y="10.5" width="7.5" height="7.5" rx="3.75" fill={fill} />
  </svg>
);
