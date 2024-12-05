export default function FancyLoader() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 z-10">
      <div className="relative w-12 h-12 animate-spin-transform">
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-x-90 origin-center"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-x-0 origin-center"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-y-90 origin-center"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-y-0 origin-center"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-z-90 origin-center"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-90 transform rotate-z-0 origin-center"></div>
      </div>
    </div>
  );
}
