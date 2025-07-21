import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
    return [
        {title: 'CVAI'},
        {name: "description", content: "Your Curriculum Vitae meets AI"},
    ];
}

export default function Home() {
    return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
        <Navbar/>
        <section className={"main-section"}>
            <div className={"page-heading"}>
                <h1>
                    Track your applications and Resume Ratings
                </h1>
                <h2>
                    Review you submissions and check AI-powered feedback.
                </h2>

            </div>
            {resumes.length > 0 && (

                <div className={"resumes-section"}>

                    {resumes.map((resume) => {
                        return (
                            <ResumeCard key={resume.id} resume={resume}/>
                        )
                    })}
                </div>
            )}
        </section>
    </main>;
}
