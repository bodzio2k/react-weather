import { Navigation } from "lucide-react";

export type CurrentLocationCardProps = {
  isCurrent?: boolean;
  name: string;
  temp: number | string;
  feelsLike: number;
  high: number;
  low: number;
};

export function CurrentLocationCard({
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
        <div className="text-xl font-medium text-black">{temp}</div>
        <div className="text-xl font-medium text-black">
          Feels like: {feelsLike}
        </div>
        <div className="text-xl font-medium text-black">
          H: {high} L: {low}
        </div>
      </div>
    </>
  );
}
