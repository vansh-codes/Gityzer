import React, { useEffect, useRef } from "react";

const CanvasEditor = React.forwardRef(({ config }, ref) => {
  const canvasRef = ref || useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = config.theme === "dark" ? "#030303" : "#E8E8E8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawContent() {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const noStatsActive = !config.star && !config.fork && !config.issue;
      const yOffset = noStatsActive ? 30 : 0;

      if (config.image === "") {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = "/github-filled.svg";
        img.onload = () => {
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset;

          ctx.save();
          ctx.filter = config.theme === "dark" ? "invert(1)" : "invert(0)";
          ctx.beginPath();
          ctx.arc(x + 80, y + 80, 80, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, 160, 160);
          ctx.restore();
          ctx.filter = "none";
        };
      } else {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = config.image;
        img.onload = () => {
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + 80, y + 80, 80, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, 160, 160);
          ctx.restore();
          ctx.filter = "none";
        };
      }

      ctx.fillStyle = config.theme === "dark" ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (config.username) {
        ctx.font = `32px ${config.font}`;
        const usernameText = typeof config.UserName === "string" ? config.UserName : "Default Username";
        ctx.fillText(usernameText, canvasWidth / 2, canvasHeight / 2 + 40 + yOffset);
      }

      if (config.tagline) {
        ctx.font = `18px ${config.font}`;
        const taglineText = typeof config.Tagline === "string" ? config.Tagline : "Tagline";
        ctx.fillText(taglineText, canvasWidth / 2, canvasHeight / 2 + 80 + yOffset);
      }

      function calculatePositions(items, canvasWidth) {
        const spacing = items.length === 3 ? 75 : 120;
        const totalWidth = items.length * 75 + (items.length - 1) * spacing;
        const startX = (canvasWidth - totalWidth) / 2;
        return items.map((item, index) => startX + index * (75 + spacing));
      }

      const activeStats = [];
      if (config.star) activeStats.push({ label: "Star", color: "orange", count: config.star_count });
      if (config.fork) activeStats.push({ label: "Fork", color: "lightblue", count: config.fork_count });
      if (config.issue) activeStats.push({ label: "Issue", color: "lightgreen", count: config.issue_count });

      const positions = calculatePositions(activeStats, canvas.width);

      positions.forEach((x, i) => {
        const stat = activeStats[i];

        ctx.fillStyle = config.theme === "dark" ? "grey" : "lightgrey";
        ctx.fillRect(x, 300, 50, 18);

        ctx.fillStyle = stat.color;
        ctx.fillRect(x + 50, 300, 25, 18);

        ctx.fillStyle = config.theme === "dark" ? "#fff" : "#474747";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = `bold 14px consolas`;
        ctx.fillText(stat.label, x + 25, 303);

        ctx.fillStyle = "#333333";
        ctx.fillText(stat.count, x + 62.5, 303);
      });
    }

    if (config.pattern === "shape 1") {
      const patternImg = new Image();
      patternImg.crossOrigin = "Anonymous";
      patternImg.src = "/shape1.png";
      patternImg.onload = () => {
        ctx.filter = config.theme === "dark" ? "invert(0.2)" : "invert(0.5)";
        ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
        ctx.filter = "none";
        drawContent();
      };
    } else if (config.pattern === "shape 2") {
      const patternImg = new Image();
      patternImg.crossOrigin = "Anonymous";
      patternImg.src = "/shape2.png";
      patternImg.onload = () => {
        ctx.filter = "opacity(50%)";
        ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
        ctx.filter = "none";
        drawContent();
      };
    } else {
      drawContent();
    }
  }, [config]);

  return <canvas ref={canvasRef} width={720} height={360} />;
});

export default CanvasEditor;
