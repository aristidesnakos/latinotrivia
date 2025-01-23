import Link from "next/link";
import { getSEOTags } from "@/lib/seo";
import config from "@/configs/configuration";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
{`Last Updated: September 27, 2024
Welcome to CreateQuiz.Video!
These Terms of Service ("Terms") govern your use of the CreateQuiz.Video website at https://createquiz.video ("Website") and the services provided by CreateQuiz.Video. By using our Website and services, you agree to these Terms.

1. Description of CreateQuiz.Video

CreateQuiz.Video is a platform that allows users to create mobile-formatted quizzes to engage their audience and enhance their mobile presence in platforms like YouTube, Instagram, and TikTok.

2. Use of Services

CreateQuiz.Video offers quiz creation tools and related services for personal and commercial use. You may access and use these services for your own purposes, but you may not redistribute, resell, or commercially exploit our tools without explicit permission.

3. User Data and Privacy

We collect and store user data, including name, email, YouTube username, and posting frequency, as necessary to provide our quiz creation services. For details on how we handle your data, please refer to our Privacy Policy at https://createquiz.video/privacy-policy.

4. Non-Personal Data Collection

We use web cookies to collect non-personal data for the purpose of improving our services and user experience.

5. Accuracy of Services

While we strive to provide accurate and reliable quiz creation tools, we cannot guarantee the absolute performance of our services. Users should ensure their quizzes comply with YouTube's guidelines and policies.

6. Limitation of Liability

CreateQuiz.Video is not responsible for any damages or losses resulting from the use or misuse of our services. Users are advised to use our tools responsibly and in accordance with applicable laws and regulations.

7. Advertisements

7.1 Google AdSense
Our Website may display third-party advertisements served by Google AdSense. By using our Website, you agree to the use of Google AdSense.
7.2 Third-Party Links
Advertisements may contain links to third-party websites. We are not responsible for the content or privacy practices of these third-party sites. Users are encouraged to review the privacy policies and terms of service of any third-party sites they visit.
7.3 No Endorsement
The presence of advertisements on our Website does not constitute an endorsement of the advertised products or services by CreateQuiz.Video.

8. Governing Law

These Terms are governed by the laws of the jurisdiction where CreateQuiz.Video is registered.

9. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any significant changes via email or through our Website.
For any questions or concerns regarding these Terms of Service, please contact us at ari@createquiz.video.
Thank you for using CreateQuiz.Video!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
