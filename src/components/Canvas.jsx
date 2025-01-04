import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast'

export default function CanvasEditor({ config }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the base theme background
    ctx.fillStyle = config.theme === "dark" ? "#030303" : "#E8E8E8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the background pattern if pattern is "shape 1"
    if (config.pattern === "shape 1") {
      const patternImg = new Image();
      patternImg.src = "/shape1.png";
      patternImg.onload = () => {
        ctx.filter = config.theme === "dark" ? "invert(0.2)" : "invert(0.5)";
        ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height); // Cover the entire canvas
        ctx.filter = "none";
        drawContent();
      };
    } else if (config.pattern === "shape 2") {
      const patternImg = new Image();
      patternImg.src = "/shape2.png";
      patternImg.onload = () => {
        ctx.filter = "opacity(50%)";
        ctx.drawImage(patternImg, 0, 0, canvas.width, canvas.height); // Cover the entire canvas
        ctx.filter = "none";
        drawContent();
      };
    } else {
      // If no pattern, proceed with drawing content
      drawContent();
    }

    function drawContent() {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Check if none of the star, fork, or issue options are active
      const noStatsActive = !config.star && !config.fork && !config.issue;
      const yOffset = noStatsActive ? 30 : 0; // Move elements down by 50px if no stats are active

      // Render image if provided
      if (config.image === "") {
        const img = new Image();
        img.src = "/github-filled.svg";
        img.onload = () => {
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset; // Apply yOffset

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
        img.src = config.image;
        img.onload = () => {
          const x = (canvasWidth - 160) / 2;
          const y = (canvasHeight - 300) / 2 + yOffset; // Apply yOffset

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + 80, y + 80, 80, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, 160, 160);
          ctx.restore();
          ctx.filter = "none";
        };
      }

      // Set theme-based fill color
      ctx.fillStyle = config.theme === "dark" ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw Username
      if (config.username) {
        ctx.font = `32px ${config.font}`;
        const usernameText = typeof config.UserName === "string" ? config.UserName : "Default Username";
        ctx.fillText(usernameText, canvasWidth / 2, canvasHeight / 2 + 40 + yOffset); // Apply yOffset
      }

      // Draw Tagline
      if (config.tagline) {
        ctx.font = `18px ${config.font}`;
        const taglineText = typeof config.Tagline === "string" ? config.Tagline : "Tagline";
        ctx.fillText(taglineText, canvasWidth / 2, canvasHeight / 2 + 80 + yOffset); // Apply yOffset
      }

      // Define a function to calculate positions for active stats
      function calculatePositions(items, canvasWidth) {
        const spacing = items.length === 3 ? 75 : 120;
        const totalWidth = items.length * 75 + (items.length - 1) * spacing;
        const startX = (canvasWidth - totalWidth) / 2;
        return items.map((item, index) => startX + index * (75 + spacing));
      }

      // Collect active stats
      const activeStats = [];
      if (config.star) activeStats.push({ label: "Star", color: "orange", count: config.star_count });
      if (config.fork) activeStats.push({ label: "Fork", color: "lightblue", count: config.fork_count });
      if (config.issue) activeStats.push({ label: "Issue", color: "lightgreen", count: config.issue_count });

      // Calculate positions for active stats
      const positions = calculatePositions(activeStats, canvas.width);

      // Draw active stats dynamically
      positions.forEach((x, i) => {
        const stat = activeStats[i];

        // Draw the background rectangle
        ctx.fillStyle = config.theme === "dark" ? "grey" : "lightgrey";
        ctx.fillRect(x, 300, 50, 18);

        // Draw the colored rectangle
        ctx.fillStyle = stat.color;
        ctx.fillRect(x + 50, 300, 25, 18);

        // Draw the label text
        ctx.fillStyle = config.theme === "dark" ? "#fff" : "#474747";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = `bold 14px consolas`;
        ctx.fillText(stat.label, x + 25, 303);

        // Draw the count text
        ctx.fillStyle = "#333333";
        ctx.fillText(stat.count, x + 62.5, 303);
      });
    }
  }, [config]);

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${config.UserName}-canvas.png`;
    link.href = url;
    link.click();
    toast.success("Image downloaded successfully!");
  };

  const exportMarkdown = () => {
    const canvas = canvasRef.current;
    const markdownLink = `![Canvas Output](${canvas.toDataURL("image/png")})`;
    navigator.clipboard
      .writeText(markdownLink)
      .then(() => toast.success("Markdown copied successfully!"))
      .catch(() => toast.error("Failed to copy Markdown link!"));
  };

  const exportURL = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Image URL copied successfully!"))
      .catch(() => toast.error("Failed to copy Image URL!"));
  };

  const exportHTML = () => {
    const canvas = canvasRef.current;
    const htmlCode = `<img src="${canvas.toDataURL("image/png")}" alt="Canvas Output" />`;
    navigator.clipboard
      .writeText(htmlCode)
      .then(() => toast.success("HTML code copied successfully!"))
      .catch(() => toast.error("Failed to copy HTML code!"));
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <canvas ref={canvasRef} width={720} height={360} className="border-none rounded-xl" />
      <div className="text-justify font-semibold font-mono flex bg-slate-800 bg-opacity-80 rounded-xl p-4 shadow-lg gap-8 items-center justify-center">
        <button
          onClick={exportMarkdown}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/markdown.svg" alt="Markdown svg" width="20" />MARKDOWN
        </button>
        <button
          onClick={exportCanvas}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]"
        >
          <img src="/download.svg" alt="Download dvg" width="20" />DOWNLOAD
        </button>
        <button
          onClick={exportURL}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/url.svg" alt="URL svg" width="20" />URL
        </button>
        <button
          onClick={exportHTML}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/img.svg" alt="Image svg" width="20" />&lt;IMG /&gt;
        </button>
      </div>
      <Toaster />
    </div>
  );
}
