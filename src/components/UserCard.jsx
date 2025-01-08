import React from "react";

const UserCard = ({ config }) => {
  const calculatePositions = (items, svgWidth) => {
    const spacing = items.length === 3 ? 75 : 120;
    const totalWidth = items.length * 75 + (items.length - 1) * spacing;
    const startX = (svgWidth - totalWidth) / 2;
    return items.map((_, index) => startX + index * (75 + spacing));
  };

  const renderStats = () => {
    const activeStats = [];
    if (config.star) activeStats.push({ label: "Star", color: "orange", count: config.star_count || 0 });
    if (config.fork) activeStats.push({ label: "Fork", color: "lightblue", count: config.fork_count || 0 });
    if (config.issue) activeStats.push({ label: "Issue", color: "lightgreen", count: config.issue_count || 0 });

    const positions = calculatePositions(activeStats, 720);

    return positions.map((x, i) => {
      const stat = activeStats[i];
      return (
        <g key={i}>
          <rect x={x} y={300} width={50} height={18} fill={config.theme === "dark" ? "grey" : "lightgrey"} />
          <rect x={x + 50} y={300} width={25} height={18} fill={stat.color} />
          <text
            x={x + 25}
            y={303}
            textAnchor="middle"
            alignmentBaseline="hanging"
            fontSize="14"
            fontWeight="bold"
            fontFamily="consolas"
            fill={config.theme === "dark" ? "#fff" : "#474747"}
          >
            {stat.label}
          </text>
          <text
            x={x + 62.5}
            y={304.5}
            textAnchor="middle"
            alignmentBaseline="hanging"
            fontSize="14"
            fontWeight="bold"
            fill="#333333"
          >
            {stat.count}
          </text>
        </g>
      );
    });
  };

  const statsDisplayed = config.star || config.fork || config.issue;
  const yOffset = statsDisplayed ? -30 : 0;

  const patternSrc = {
    "shape 1": "/shape1.svg",
    "shape 2": "/shape2.svg",
  }[config.pattern] || "";

  return (
    <svg width={720} height={360} xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="720" height="360" fill={config.theme === "dark" ? "#030303" : "#E8E8E8"} />

      {/* Pattern Image */}
      {patternSrc && (
        <image
          href={patternSrc}
          width="720"
          height="360"
          preserveAspectRatio="xMidYMid slice"
          style={config.theme === "dark" ? { filter: "invert(0.5)", opacity: 0.5 } : { opacity: 0.5 }}
        />
      )}

      {/* Profile Image */}
      <clipPath id="circleClip">
        <circle cx="360" cy={140 + yOffset} r="80" />
      </clipPath>
      <circle cx="360" cy={140 + yOffset} r="80" fill={config.theme === "dark" ? "#030303" : "#E8E8E8"} />
      <image
        href={config.image === "" ? "/default_profile.svg" : config.image}
        x="280"
        y={60 + yOffset}
        width="160"
        height="160"
        clipPath="url(#circleClip)"
        preserveAspectRatio="xMidYMid slice"
        style={config.image === "" && config.theme === "dark" ? { filter: "invert(1)" } : {}}
      />

      {/* Username */}
      {config.username && (
        <text
          x="360"
          y={260 + yOffset}
          textAnchor="middle"
          fontSize="32"
          fontFamily={config.font || "Arial"}
          fill={config.theme === "dark" ? "#fff" : "#000"}
        >
          {config.UserName || "Default Username"}
        </text>
      )}

      {/* Tagline */}
      {config.tagline && (
        <text
          x="360"
          y={290 + yOffset}
          textAnchor="middle"
          fontSize="18"
          fontFamily={config.font || "Arial"}
          fill={config.theme === "dark" ? "#fff" : "#000"}
        >
          {config.Tagline || "Tagline"}
        </text>
      )}

      {/* Stats */}
      {renderStats()}
    </svg>
  );
};

export default UserCard;
export { UserCard };
