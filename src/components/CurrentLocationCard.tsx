import { Navigation } from "lucide-react";

export type CurrentLocationCardProps = {
  isCurrent?: boolean;
  name: string;
  temp: number | string;
  feelsLike: number;
  high: number;
  low: number;
};

const formatTemperature = (temp: number | string): string | number => {
  if (typeof temp === "string") return temp;
  return Number(temp.toFixed(2));
};

export default function CurrentLocationCard({
  isCurrent,
  name,
  temp,
  feelsLike,
  high,
  low,
}: CurrentLocationCardProps) {
  console.log("Creating card...");

  return (
    <>
      <div className="flex flex-col gap-0 items-center">
        <div className="flex items-center">
          {isCurrent && <Navigation size={16} />}
          <div className="text-xl font-medium text-black">Home</div>
        </div>

        <div className="text-xl font-medium text-black">{name}</div>
        <div className="text-xl font-medium text-black">
          {formatTemperature(temp)}
        </div>
        <div className="text-xl font-medium text-black">
          Feels like: {formatTemperature(feelsLike)}
        </div>
        <div className="text-xl font-medium text-black">
          H: {formatTemperature(high)} L: {formatTemperature(low)}
        </div>
      </div>
    </>
  );
}
