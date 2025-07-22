import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-teal-100 to-purple-100 flex items-center justify-center">
      <div className="gradient-border shadow-lg max-w-lg w-full p-8 rounded-xl flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-teal-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-md">
              {auth.user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-dark-200">
                {auth.user?.username || "Unknown User"}
              </span>
              <span className="text-sm text-gray-500">
                {auth.user?.email || "No email"}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            Account ID: {auth.user?.username || "-"}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-dark-200 mb-2">
            Your Files
          </h2>
          <div className="flex flex-col gap-3 bg-white rounded-lg p-4 shadow-sm min-h-[60px]">
            {files.length === 0 ? (
              <span className="text-gray-400">No files found.</span>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-row gap-4 items-center border-b last:border-b-0 py-2"
                >
                  <span className="font-medium text-purple-700">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {file.size ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <button
            className="primary-button w-full max-w-xs text-base font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
            onClick={handleDelete}
          >
            Wipe App Data
          </button>
          <span className="text-xs text-gray-400 mt-1">
            This will delete all your files and app data.
          </span>
          <button
            className="primary-button w-full max-w-xs text-base font-semibold rounded-lg mt-4 bg-teal-500 hover:bg-teal-600 transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default WipeApp;
