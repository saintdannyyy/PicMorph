import Footer from "./components/Footer";
import Header from "./components/Header";
import UploadImage from "./components/Upload";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-grow items-center justify-center w-full">
        <Analytics />
        <SpeedInsights />
        <UploadImage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
