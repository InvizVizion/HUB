# 🌍 WorldNow

> Real-time Interactive Map of Global Events & Conflicts

WorldNow is a stunning, premium single-page application that visualizes global events, conflicts, and news in real-time on an interactive world map. Built with modern web technologies and designed with a focus on beautiful, expensive-looking UI.

**✨ 100% FREE - No API keys or registration required!**

![WorldNow Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Free](https://img.shields.io/badge/100%25-FREE-brightgreen?style=for-the-badge)

## ✨ Features

- 🌐 **Interactive World Map** - Smooth, responsive map with Leaflet & OpenStreetMap
- 🔥 **Real-time Hotspots** - Animated markers for global events with severity-based coloring
- 💎 **Glassmorphism Design** - Premium dark theme with glass-effect panels
- ⚡ **Smooth Animations** - Buttery smooth transitions powered by Framer Motion
- 📊 **Live Statistics** - Real-time event counters and severity breakdown
- 🎯 **Event Details** - Detailed popup panels with sources and locations
- 🔄 **Auto-refresh** - Automatic updates every 15 minutes
- 📱 **Responsive** - Works beautifully on all devices
- 🆓 **Zero Setup** - No API keys needed, just install and run!

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Maps**: Leaflet + React Leaflet (OpenStreetMap tiles)
- **Animations**: Framer Motion
- **Data Source**: Mock data (ready for GDELT API integration)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- **No API keys required!** 🎉

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd worldnow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! No configuration needed. 🚀

## 🎨 Design Features

### Color Scheme
- **Background**: Dark gradient (purple → deep blue)
- **Critical Events**: Glowing red (#ef4444)
- **High Severity**: Orange (#fb923c)
- **Medium Severity**: Yellow (#fbbf24)
- **Low Severity**: Green

### UI Elements
- **Glassmorphism panels** with backdrop blur
- **Glow effects** on hotspot markers
- **Smooth camera animations** on event selection
- **Pulsing markers** for active events
- **Dark map theme** from CartoDB

## 🗺️ Map Technology

WorldNow uses **Leaflet** with **OpenStreetMap** tiles, which means:
- ✅ **Completely free** - no API keys or credit cards
- ✅ **No rate limits** for reasonable use
- ✅ **Beautiful dark theme** from CartoDB
- ✅ **Fast and lightweight**
- ✅ **Works offline** (after initial tile load)

## 📡 Data Integration

Currently using mock data for demonstration. To integrate real-time data:

### GDELT API (Free)
```typescript
// app/api/events/route.ts
const GDELT_API = 'https://api.gdeltproject.org/api/v2/doc/doc';

// Fetch recent events
const response = await fetch(
  `${GDELT_API}?query=conflict&mode=artlist&maxrecords=250&format=json`
);
```

### Alternative Sources
- **NewsAPI** - https://newsapi.org/ (free tier available)
- **ACLED** - https://acleddata.com/ (registration required)
- **Event Registry** - https://eventregistry.org/ (free tier available)

## 🔧 Configuration

### Map Styles

The app uses CartoDB's dark theme by default. You can change it in `components/WorldMap.tsx`:

```typescript
// Options:
// - Dark: https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
// - Light: https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
// - Voyager: https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png
```

### Update Frequency

Auto-refresh interval can be adjusted in `app/page.tsx`:

```typescript
const interval = setInterval(fetchEvents, 15 * 60 * 1000); // 15 minutes
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended - FREE!)
1. Push to GitHub
2. Import project in Vercel
3. Deploy! (No environment variables needed)

### Netlify (Also FREE!)
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Future Enhancements

- [ ] Historical timeline slider
- [ ] Filter by event type
- [ ] Heatmap visualization
- [ ] User authentication
- [ ] Save favorite locations
- [ ] Custom alerts
- [ ] News aggregation from multiple sources
- [ ] Social media sentiment analysis
- [ ] Mobile app (React Native)
- [ ] Clustering for dense event areas
- [ ] Export to PDF/Image

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data
- [CartoDB](https://carto.com/) - Beautiful dark map tiles
- [Leaflet](https://leafletjs.com/) - Open-source mapping library
- [GDELT Project](https://gdeltproject.org/) - Global event data
- [Framer Motion](https://framer.com/motion/) - Smooth animations
- [Next.js](https://nextjs.org/) - The React Framework

---

Made with ❤️ for a better understanding of our world

**No API keys. No credit cards. Just pure, free, beautiful global event tracking.** 🌍✨
