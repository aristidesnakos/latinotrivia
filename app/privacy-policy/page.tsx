import Link from "next/link";
import { getSEOTags } from "@/lib/seo";
import config from "@/configs/configuration";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: December 6, 2024
Thank you for visiting CreateQuiz.Video ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://createquiz.video (the "Website").
By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website.

1. Information We Collect

1.1 Personal Data
We collect the following personal information from you:
- **Name:** We collect your name to personalize your experience and communicate with you effectively.
- **Email:** We collect your email address to send you important information regarding your CreateQuiz.Video services, updates, and communication.

1.2 Non-Personal Data
We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.

2. Purpose of Data Collection

We collect and use your personal data for the purpose of providing quiz creation tools, integrating with TikTok, managing payments, and improving our services. This includes generating personalized quizzes, managing your account, processing payments, and keeping you informed about important updates.

3. Data Sharing

We do not share your personal data with any third parties except as required for providing our services. We do not sell, trade, or rent your personal information to others.

4. Children's Privacy

CreateQuiz.Video is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at the email address provided below.

5. Payment Information

We collect payment information such as your name, email, and payment details to process transactions. This information is securely stored and is not sold to third parties.

6. Google AdSense

We may use Google AdSense to display advertisements on our Website. Google AdSense may use cookies and web beacons to collect data about your visits to this and other websites to provide personalized advertising based on your interests. If you would like more information about this practice and to know your choices about not having this information used by Google AdSense, please visit https://policies.google.com/technologies/ads.

7. Data Protection Mechanisms

7.1 Security Measures
We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include:
- Encryption of data in transit using TLS/SSL protocols
- Encryption of sensitive data at rest using industry-standard encryption methods
- Regular security assessments and penetration testing
- Access controls and authentication mechanisms
- Regular security training for our staff
- Monitoring systems for detecting and preventing security breaches

7.2 Third-Party Service Providers
When we engage third-party service providers who may have access to your data, we ensure they maintain appropriate security standards through contractual obligations and regular audits.

8. Data Retention and Deletion

8.1 General Data Retention
- We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected
- Account information is retained for the duration of your active account plus 30 days after account deletion
- Payment information is retained for 7 years as required by tax and accounting regulations
- Usage logs and analytics data are retained for 12 months

8.2 Google User Data
We handle Google user data in accordance with Google API Services User Data Policy:
- We only request access to the Google user data that is necessary for the implementation of authorized features
- We do not store Google user data longer than necessary to implement the authorized features
- Users can request deletion of their Google user data at any time through our data deletion request form
- Upon receiving a deletion request, we will remove all Google user data within 30 days
- We do not sell Google user data or use it for any purpose other than providing our service

8.3 Data Deletion Requests
You can request deletion of your personal data, including Google user data, by:
- Using our data deletion request form at /delete-personal-data
- Emailing our Data Protection Officer at ari@createquiz.video
- Deleting your account through the dashboard settings

Upon receiving your request:
- We will verify your identity to ensure the security of the deletion process
- Your data will be permanently deleted within 30 days
- You will receive confirmation once the deletion is complete
- Any data shared with third-party services will also be requested for deletion

9. Contact Information

If you have any questions about this Privacy Policy or our data practices, please contact us at:
Email: ari@createquiz.video

10. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and we may notify you via email about significant changes.

11. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:
**Email:** ari@createquiz.video
For all other inquiries, please visit our Contact Us page on the Website.

By using CreateQuiz.Video, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
