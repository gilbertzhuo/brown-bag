import React from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useTheme } from "next-themes";

type Props = { finished: boolean };

const loadingTexts = [
  "Hydrating for optimal health...",
  "Remembering to take breaks and stretch...",
  "Choosing whole foods over processed ones...",
  "Prioritizing mental well-being and self-care...",
  "Engaging in regular exercise and activity...",
];

const LoadingQuestions = ({ finished }: Props) => {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(10);
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="w-full flex justify-center items-center p-12 flex-col">
      <Image
        src={theme.theme == "dark" ? "/loading-dark.gif" : "/loading.gif"}
        width={400}
        height={400}
        alt="loading"
      />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingQuestions;
