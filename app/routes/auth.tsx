import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  {
    title: "CVAI | Auth",
  },
  {
    name: "description",
    content: "Log into your account",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated]);
  return (
    <main
      className={
        "bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center"
      }
    >
      <div className={"gradient-border shadow-lg max-w-md w-full"}>
        <section
          className={"flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8"}
        >
          <div className={"flex flex-col items-center gap-1 text-center"}>
            <h1 className="text-2xl font-bold">Welcome to CVAI!</h1>
            <h2 className="text-base text-gray-600 font-medium">
              Log in to Continue Your Job Journey
            </h2>
          </div>
          <div className="mt-2">
            {isLoading ? (
              <button
                className={"auth-button animate-pulse w-full py-2 text-base"}
              >
                <p>Signing in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className={"auth-button w-full py-2 text-base"}
                    onClick={auth.signOut}
                  >
                    <p>Log out</p>
                  </button>
                ) : (
                  <button
                    className={"auth-button w-full py-2 text-base"}
                    onClick={auth.signIn}
                  >
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
export default Auth;
