# 🌍 WorldNow

> Real-time Interactive Map of Global Events & Conflicts

WorldNow is a stunning, premium single-page application that visualizes global events, conflicts, and news in real-time on an interactive 3D globe. Built with modern web technologies and designed with a focus on beautiful, expensive-looking UI.

![WorldNow Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- 🌐 **Interactive 3D Globe** - Smooth rotating globe with Mapbox GL
- 🔥 **Real-time Hotspots** - Animated markers for global events with severity-based coloring
- 💎 **Glassmorphism Design** - Premium dark theme with glass-effect panels
- ⚡ **Smooth Animations** - Buttery smooth transitions powered by Framer Motion
- 📊 **Live Statistics** - Real-time event counters and severity breakdown
- 🎯 **Event Details** - Detailed popup panels with sources and locations
- 🔄 **Auto-refresh** - Automatic updates every 15 minutes
- 📱 **Responsive** - Works beautifully on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Animations**: Framer Motion
- **Data Source**: Mock data (ready for GDELT API integration)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A free Mapbox account ([sign up here](https://account.mapbox.com/))

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

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

   Get your free token at: https://account.mapbox.com/

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

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
- **Auto-rotating globe** (stops on user interaction)

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
- **NewsAPI** - https://newsapi.org/
- **ACLED** - https://acleddata.com/
- **Event Registry** - https://eventregistry.org/

## 🔧 Configuration

### Mapbox Styles

The app uses `mapbox://styles/mapbox/dark-v11` by default. You can customize it in `components/WorldMap.tsx`:

```typescript
style: 'mapbox://styles/mapbox/dark-v11', // or your custom style URL
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

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable
4. Deploy!

### Docker
```bash
docker build -t worldnow .
docker run -p 3000:3000 worldnow
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Mapbox](https://mapbox.com/) - Beautiful maps
- [GDELT Project](https://gdeltproject.org/) - Global event data
- [Framer Motion](https://framer.com/motion/) - Smooth animations
- [Next.js](https://nextjs.org/) - The React Framework

---

Made with ❤️ for a better understanding of our world

**Live Demo**: Coming soon...
