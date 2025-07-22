import ScoreBadge from "./ScoreBadge";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const getGradient = (score: number) => {
  if (score > 69) {
    return "bg-gradient-to-r from-green-100 via-green-200 to-green-300";
  } else if (score > 49) {
    return "bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300";
  } else {
    return "bg-gradient-to-r from-red-100 via-red-200 to-red-300";
  }
};

const ATS = ({ score, suggestions }: ATSProps) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${getGradient(
        score
      )} w-full max-w-xl mx-auto`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">ATS Score</h2>
        <ScoreBadge score={score} />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Suggestions
        </h3>
        <ul className="space-y-2">
          {suggestions.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              {s.type === "good" ? (
                <img src="/icons/check.svg" alt="good" className="w-5 h-5" />
              ) : (
                <img
                  src="/icons/warning.svg"
                  alt="improve"
                  className="w-5 h-5"
                />
              )}
              <span
                className={
                  s.type === "good" ? "text-green-800" : "text-yellow-800"
                }
              >
                {s.tip}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* closing encouragement */}
      <p className="text-gray-600 mt-4">
        Keep refinighing your resume to improve your ATS score.
      </p>
    </div>
  );
};

export default ATS;
