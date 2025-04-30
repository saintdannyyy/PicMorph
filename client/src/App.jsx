import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import UploadImage from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Analytics />
      <SpeedInsights />

      <main className="flex-grow flex items-center justify-center p-6">
        <UploadImage />
      </main>

      <footer className="p-4 text-center text-sm">
        <p>Built with ❤️ by saintdannyyy © 2025</p>
        <a
          href="https://buymeacoffee.com/saintdannyyy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-md transition-colors"
        >
          ☕ Buy Me a Coffee
        </a>
      </footer>
    </div>
  );
}

export default App;
