import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  {
    title: "CVAI | Resume",
  },
  {
    name: "description",
    content: "View your resume details",
  },
];
const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated]);
  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ imageBlob, imageUrl, feedback: feedback });
    };
    loadResume();
  }, [id]);
  return (
    <main className={"!pt-0"}>
      <nav className={"resume-nav"}>
        <Link to={"/"} className="back-button">
          <img src="/icons/back.svg" alt="back" className={"size-2.5"} />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse items-stretch min-h-[90vh]">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-auto max-lg:py-8 flex items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-fit w-fit flex flex-col items-center justify-center p-6">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open PDF"
              >
                <img
                  src={imageUrl}
                  alt="Resume Preview"
                  className="w-full max-w-[400px] h-auto object-contain rounded-2xl shadow-lg border border-gray-200"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-2xl font-bold !text-black">Resume Feedback</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="Resume Scan" />
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
