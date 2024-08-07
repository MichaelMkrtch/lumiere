import {
  InfinityGauntletIcon,
  AvengersIcon,
  DeathStarIcon,
  GameOfThronesIcon,
  HPIcon,
  LightsaberIcon,
  OneRingIcon,
  SandwormIcon,
  StarIcon,
  TargaryenIcon,
} from "@/components/ui/Icons";

export default function getIcon(title: string) {
  if (
    title.includes("Avengers") &&
    !title.includes("Infinity War") &&
    !title.includes("Endgame")
  ) {
    return <AvengersIcon />;
  } else if (
    title.includes("Avengers") &&
    (title.includes("Infinity War") || title.includes("Endgame"))
  ) {
    return <InfinityGauntletIcon />;
  } else if (title.includes("Dune")) {
    return <SandwormIcon />;
  } else if (title.includes("Harry Potter")) {
    return <HPIcon />;
  } else if (title.includes("Lord of the Rings")) {
    return <OneRingIcon />;
  } else if (
    title === "Star Wars" ||
    title.includes("Empire Strikes Back") ||
    title.includes("Return of the Jedi")
  ) {
    return <DeathStarIcon />;
  } else if (title.includes("Star Wars")) {
    return <LightsaberIcon />;
  } else if (title.includes("House of the Dragon")) {
    return <TargaryenIcon />;
  } else if (title.includes("Game of Thrones")) {
    return <GameOfThronesIcon />;
  }

  return <StarIcon fill="#FFD43B" classes="h-6 w-6" />;
}
