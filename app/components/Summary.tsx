import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-500"
      : score > 49
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-lg">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};
const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full">
      <div className="flex flex-row items-center gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2>Your resume has a score of {feedback.overallScore}%</h2>
          <p className="text-sm text-gray-500">
            This score is based on a combination of your resume&apos;s
            performance and the feedback you&apos;ve received from recruiters.
          </p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};
export default Summary;
