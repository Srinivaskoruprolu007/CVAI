import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const getBadgeProps = (score: number) => {
  if (score > 69) {
    return {
      text: "Strong",
      bg: "bg-green-100",
      textColor: "text-green-800",
    };
  } else if (score > 49) {
    return {
      text: "Good Start",
      bg: "bg-yellow-100",
      textColor: "text-yellow-800",
    };
  } else {
    return {
      text: "Needs work",
      bg: "bg-red-100",
      textColor: "text-red-800",
    };
  }
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const { text, bg, textColor } = getBadgeProps(score);
  return (
    <span
      className={`score-badge ${bg} ${textColor} text-sm font-semibold px-3 py-1 rounded-full`}
    >
      {text} ({score})
    </span>
  );
};

export default ScoreBadge;
