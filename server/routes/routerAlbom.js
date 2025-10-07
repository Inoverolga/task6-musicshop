import express from "express";

const routerAlbom = express.Router();

const albumStyles = {
  pop: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#ff6b6b", "#ffa726"],
    },
    elements: (size) => `
      <circle cx="${size / 2}" cy="${size / 2}" r="${
      size / 4
    }" fill="white" opacity="0.2"/>
      <text x="${size / 2}" y="${size / 2 + 10}" font-size="${
      size / 15
    }">POP</text>
      <text x="${size / 2}" y="${size / 2 + 40}" font-size="${
      size / 20
    }">VIBES</text>
    `,
  },
  rock: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
      colors: ["#2c3e50", "#34495e"],
    },
    elements: (size) => `
      <path d="M${size * 0.3},${size * 0.6} L${size * 0.7},${size * 0.6} L${
      size * 0.8
    },${size * 0.8} L${size * 0.2},${size * 0.8} Z" 
            fill="none" stroke="#e74c3c" stroke-width="${size / 50}"/>
      <text x="${size / 2}" y="${size * 0.9}" font-size="${
      size / 12
    }" fill="#e74c3c">ROCK</text>
    `,
  },
  electronic: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
      colors: ["#000428", "#004e92"],
    },
    elements: (size) => `
      <circle cx="${size / 2}" cy="${size / 2}" r="${
      size / 4
    }" fill="none" stroke="#00f2fe" 
              stroke-width="3" stroke-dasharray="10,5"/>
      <text x="${size / 2}" y="${size * 0.7}" font-size="${
      size / 15
    }" fill="#00f2fe">SYNTH</text>
      <text x="${size / 2}" y="${size * 0.8}" font-size="${
      size / 20
    }" fill="#00f2fe">WAVE</text>
    `,
  },
  hiphop: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
      colors: ["#8e44ad", "#3498db"],
    },
    elements: (size) => `
      <rect x="${size * 0.3}" y="${size * 0.3}" width="${size * 0.4}" height="${
      size * 0.4
    }" 
            fill="none" stroke="white" stroke-width="${size / 50}"/>
      <text x="${size / 2}" y="${size * 0.8}" font-size="${
      size / 12
    }">URBAN</text>
    `,
  },
  jazz: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#d35400", "#e67e22"],
    },
    elements: (size) => `
      <path d="M${size * 0.3},${size * 0.7} Q${size * 0.5},${size * 0.4} ${
      size * 0.7
    },${size * 0.7}" 
            fill="none" stroke="#2c3e50" stroke-width="${size / 40}"/>
      <text x="${size / 2}" y="${size * 0.9}" font-size="${
      size / 12
    }" fill="#2c3e50">JAZZ</text>
    `,
  },
  retro: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#ff9a9e", "#fad0c4"],
    },
    elements: (size) => `
      <circle cx="${size * 0.3}" cy="${size * 0.3}" r="${
      size * 0.15
    }" fill="#ff6b6b"/>
      <circle cx="${size * 0.7}" cy="${size * 0.7}" r="${
      size * 0.15
    }" fill="#4ecdc4"/>
      <text x="${size / 2}" y="${size * 0.6}" font-size="${
      size / 12
    }" fill="#2d3436">RETRO</text>
    `,
  },
  neon: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#0c0c0c", "#1a1a1a"],
    },
    elements: (size) => `
      <path d="M${size * 0.2},${size * 0.5} L${size * 0.8},${
      size * 0.5
    }" stroke="#ff00ff" stroke-width="4"/>
      <path d="M${size * 0.5},${size * 0.2} L${size * 0.5},${
      size * 0.8
    }" stroke="#00ffff" stroke-width="4"/>
      <text x="${size / 2}" y="${size * 0.9}" font-size="${
      size / 10
    }" fill="#00ff00">NEON</text>
    `,
  },
  acoustic: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#c9d6ff", "#e2e2e2"],
    },
    elements: (size) => `
      <circle cx="${size / 2}" cy="${size / 2}" r="${
      size * 0.2
    }" fill="none" stroke="#8b4513" stroke-width="3"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${
      size * 0.05
    }" fill="#8b4513"/>
      <text x="${size / 2}" y="${size * 0.8}" font-size="${
      size / 10
    }" fill="#5d4037">ACOUSTIC</text>
    `,
  },
  funk: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#ff9a00", "#ff6b00"],
    },
    elements: (size) => `
      <polygon points="${size * 0.5},${size * 0.3} ${size * 0.7},${
      size * 0.7
    } ${size * 0.3},${size * 0.7}" fill="#ffeb3b"/>
      <text x="${size / 2}" y="${size * 0.9}" font-size="${
      size / 8
    }" fill="#e65100">FUNK</text>
    `,
  },
  classical: {
    gradient: {
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      colors: ["#f5f5f5", "#e0e0e0"],
    },
    elements: (size) => `
      <path d="M${size * 0.3},${size * 0.5} Q${size * 0.5},${size * 0.3} ${
      size * 0.7
    },${size * 0.5} Q${size * 0.5},${size * 0.7} ${size * 0.3},${size * 0.5}" 
            fill="none" stroke="#5d4037" stroke-width="2"/>
      <text x="${size / 2}" y="${
      size * 0.9
    }" font-family="Georgia" font-size="${
      size / 10
    }" fill="#3e2723">CLASSICAL</text>
    `,
  },
};

const generateAlbumCover = (style, size) => {
  const config = albumStyles[style];
  if (!config) return "";

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="${config.gradient.x1}" y1="${
    config.gradient.y1
  }" 
                       x2="${config.gradient.x2}" y2="${config.gradient.y2}">
          <stop offset="0%" stop-color="${config.gradient.colors[0]}"/>
          <stop offset="100%" stop-color="${config.gradient.colors[1]}"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#grad)"/>
      ${config.elements(size)}
    </svg>
  `;
};

Object.keys(albumStyles).forEach((style) => {
  routerAlbom.get(`/${style}`, (req, res) => {
    const size = parseInt(req.query.size) || 400;
    const svg = generateAlbumCover(style, size);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  });
});

export default routerAlbom;
