const RenderSVG = (config) => {
  const calculatePositions = (items, containerWidth) => {
    const spacing = items.length === 3 ? 75 : 120;
    const totalWidth = items.length * 75 + (items.length - 1) * spacing;
    const startX = (containerWidth - totalWidth) / 2;
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
        <div key={i} style={{
          position: 'absolute',
          left: x,
          top: 300,
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',            
            itemsAlign: 'center',
            justifyContent: 'center',
            width: 50,
            height: 18,
            backgroundColor: config.theme === "dark" ? "grey" : "lightgrey",
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'Cascadia',
            color: config.theme === "dark" ? "#fff" : "#474747"
          }}> 
            {stat.label}
          </div>
          <div style={{
            display: 'flex',
            itemsAlign: 'center',
            justifyContent: 'center',
            width: 25,
            height: 18,
            backgroundColor: stat.color,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'Cascadia',
            color: "#333333"
          }}>
            {stat.count}
          </div>
        </div>
      );
    });
  };

  const statsDisplayed = config.star || config.fork || config.issue;
  const yOffset = statsDisplayed ? -30 : 0;

  const patternSrc = {
    "shape 1": `${process.env.NEXT_PUBLIC_BASE_URL}/shape1.svg`,
    "shape 2": `${process.env.NEXT_PUBLIC_BASE_URL}/shape2.svg`,
  }[config.pattern] || "";

  return (
    <div style={{
      display: 'flex',
      itemsAlign: 'center',
      justifyContent: 'center',
      width: 720,
      height: 360,
      position: 'relative',
      backgroundColor: config.theme === "dark" ? "#030303" : "#E8E8E8"
    }}>
      {patternSrc && (
        <img
          src={patternSrc}
          alt="pattern"
          style={{
            display: 'flex',
            width: 720,
            height: 360,
            objectFit: 'cover',
            filter: config.theme === "dark" ? "invert(0.5)" : "none",
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      )}
      <div style={{
        display: 'flex',
        position: 'absolute',
        top: 140 + yOffset,
        transform: 'translateY(-50%)',
        width: 160,
        height: 160,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: config.theme === "dark" ? "#030303" : "#E8E8E8"
      }}>
        <img
          src={config.image === "" ? `${process.env.NEXT_PUBLIC_BASE_URL}/default_profile.svg` : config.image}
          alt="profile"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: config.image === "" && config.theme === "dark" ? "invert(1)" : "none"
          }}
        />
      </div>
      {config.username && (
        <div style={{
          position: 'absolute',
          display: 'flex',
          textAlign: 'center',
          margin: 'auto',
          top: 230 + yOffset,
          fontSize: 32,
          fontFamily: config.font,
          color: config.theme === "dark" ? "#fff" : "#000",
        }}>
          {config.UserName || "Default Username"}
        </div>
      )}
      {config.tagline && (
        <div style={{
          textAlign: 'center',
          display: 'flex',
          top: 270 + yOffset,
          fontSize: 18,
          fontFamily: config.font,
          color: config.theme === "dark" ? "#fff" : "#000",
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word', 
        }}>
          {config.Tagline || "Tagline"}
        </div>
      )}
      {renderStats()}
    </div>
  );
};

export default RenderSVG;
