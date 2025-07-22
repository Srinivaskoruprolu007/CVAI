import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUuid } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { fs, auth, isLoading, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      return setStatusText("Error : Failed to upload file");
    }
    setStatusText("Converting to image...");
    const imgFile = await convertPdfToImage(file);
    if (!imgFile.file) {
      return setStatusText("Error : Failed to convert pdf to image");
    }
    setStatusText("Uploading image...");
    const uploadedImage = await fs.upload([imgFile.file]);
    if (!uploadedImage) {
      return setStatusText("Error : Failed to upload image");
    }
    setStatusText("Preparing data...");

    const uuid = generateUuid();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) {
      return setStatusText("Error : Failed to analyze resume");
    }
    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) {
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };
  return (
    <main className="bg-gradient-to-br from-light-teal-100 to-purple-100 min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Smart feedback for your dream job
          </h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4 mt-4">
              <h2 className="text-2xl font-semibold text-purple-600 animate-pulse">
                {statusText}
              </h2>
              <img
                src={"/images/resume-scan.gif"}
                alt="Analyzing..."
                className="w-20 h-20 rounded-xl shadow-lg border-2 border-purple-200"
              />
            </div>
          ) : (
            <h2 className="text-2xl text-dark-200 mt-2">
              Drop your resume for an ATS score and improvement tips
            </h2>
          )}
        </div>
        {!isProcessing && (
          <form
            action=""
            id={"upload"}
            onSubmit={handleSubmit}
            className={
              "gradient-border flex flex-col gap-8 mt-8 w-full max-w-xl mx-auto shadow-lg"
            }
          >
            <div className={"form-div"}>
              <label htmlFor={"company-name"}>Company Name</label>
              <input
                type="text"
                name={"company-name"}
                placeholder={"Enter Company Name..."}
                id="company-name"
              />
            </div>
            <div className={"form-div"}>
              <label htmlFor={"job-title"}>Job Title</label>
              <input
                type="text"
                name={"job-title"}
                placeholder={"Enter Job Title..."}
                id="job-title"
              />
            </div>
            <div className={"form-div"}>
              <label htmlFor={"job-description"}>Job Description</label>
              <textarea
                rows={5}
                name={"job-description"}
                placeholder={"Enter Job Description..."}
                id="job-description"
              />
            </div>
            <div className={"form-div w-full"}>
              <label htmlFor={"uploader"}>Upload Resume</label>
              <div className="w-full uplader-drag-area">
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
            </div>
            <button type={"submit"} className={"primary-button mt-2 text-lg font-semibold rounded-lg"}>
              Analyze Resume
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
export default Upload;
