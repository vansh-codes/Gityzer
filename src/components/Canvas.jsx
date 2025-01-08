import React, { useEffect, useRef, useState } from "react";

const CanvasEditor = React.forwardRef(({ config }, ref) => {
  const canvasRef = ref || useRef(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Make canvas responsive
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      const width = Math.min(container.clientWidth, 800); // Max width of 800px
      const height = (width * 9) / 16; // 16:9 aspect ratio

      canvas.width = width;
      canvas.height = height;

      // Redraw content after resize
      drawCanvas();
    };

    // Initial size update and event listener
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const drawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = config.theme === "dark" ? "#030303" : "#E8E8E8";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawContent();
    };

    function drawContent() {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const noStatsActive = !config.star && !config.fork && !config.issue;
      const yOffset = noStatsActive ? 30 : 0;

      // Handle profile image
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => {
            setImageError(true);
            reject(new Error('Failed to load image'));
          };
          img.src = src;
        });
      };

      const drawProfileImage = async () => {
        try {
          const img = await loadImage(config.image || "/github-filled.svg");
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset;

          ctx.save();
          if (!config.image) {
            ctx.filter = config.theme === "dark" ? "invert(1)" : "invert(0)";
          }
          ctx.beginPath();
          ctx.arc(x + 80, y + 80, 80, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, 160, 160);
          ctx.restore();
          ctx.filter = "none";
        } catch (error) {
          console.error('Error loading profile image:', error);
          // Load default image as fallback
          const defaultImg = await loadImage("/github-filled.svg");
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset;

          ctx.save();
          ctx.filter = config.theme === "dark" ? "invert(1)" : "invert(0)";
          ctx.beginPath();
          ctx.arc(x + 80, y + 80, 80, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(defaultImg, x, y, 160, 160);
          ctx.restore();
          ctx.filter = "none";
        }
      };

      // Draw the profile image
      drawProfileImage();

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

      if (config.pattern === "shape 1") {
        const patternImg = new Image();
        patternImg.crossOrigin = "Anonymous";
        patternImg.src = "/shape1.png";
        patternImg.onload = () => {
          ctx.filter = config.theme === "dark" ? "invert(0.2)" : "invert(0.5)";
          ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
        };
      } else if (config.pattern === "shape 2") {
        const patternImg = new Image();
        patternImg.crossOrigin = "Anonymous";
        patternImg.src = "/shape2.png";
        patternImg.onload = () => {
          ctx.filter = "opacity(50%)";
          ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
        };
      }
    }

    drawCanvas();
  }, [config, imageError]);

  return <canvas ref={canvasRef} width={720} height={360} />;
});

export default CanvasEditor;
