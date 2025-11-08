import { Link } from "react-router-dom";

export default function Terms() {
  const updated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 text-white">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: {updated}</p>

      <div className="mt-6 space-y-6 text-white/90">
        <section>
          <h2 className="text-xl font-semibold">1. Acceptance</h2>
          <p className="mt-2">
            By accessing or using Circle (the “Service”), you agree to these
            Terms of Service and our
            <Link to="/privacy" className="text-green-400 hover:underline">
              {" "}
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Definitions</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>“We,” “Us,” or “Company” means Circle.</li>
            <li>
              “You” or “User” means any person or entity using the Service.
            </li>
            <li>
              “User Content” means posts, comments, images, profiles, and any
              materials you upload or submit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Eligibility and Accounts</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              You must be at least 13 years old or the minimum age required in
              your jurisdiction.
            </li>
            <li>
              You must provide accurate information and keep your credentials
              secure.
            </li>
            <li>
              You are responsible for all activities that occur under your
              account.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. User Content and License</h2>
          <p className="mt-2">
            You retain ownership of your User Content. By uploading, you grant
            Circle a worldwide, non-exclusive, royalty-free, transferable, and
            sublicensable license to host, store, reproduce, modify, translate,
            create derivative works, communicate, publish, display, and perform
            the User Content solely to operate, maintain, promote, and improve
            the Service.
          </p>
          <p className="mt-2">
            You represent that you have the rights necessary for the User
            Content and that it does not infringe any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Prohibited Conduct</h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Violate any law or facilitate fraud, phishing, spam, malware, or
              unauthorized scraping.
            </li>
            <li>
              Upload content that infringes intellectual property, or is
              hateful, harassing, illegal pornography, violent, or doxxing.
            </li>
            <li>
              Abuse reporting/moderation, disrupt the Service, perform DDoS, or
              attempt unauthorized access.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            6. Moderation and Enforcement
          </h2>
          <p className="mt-2">
            We may review, filter, delay display, limit reach, remove content,
            or suspend accounts where we suspect violations of these Terms or
            the law, in order to protect the community. We may but are not
            obligated to provide a general reason for enforcement actions when
            feasible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            7. Ownership and Intellectual Property
          </h2>
          <p className="mt-2">
            The Service, including software, logos, and designs, is protected by
            intellectual property laws. Unless expressly permitted, you may not
            copy, modify, or create derivative works of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            8. Copyright Complaints (DMCA)
          </h2>
          <p className="mt-2">
            If you believe your copyright has been infringed, email a notice to
            legal@richardoo.cyou containing:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
            <li>
              Identification of the copyrighted work and the infringing
              material.
            </li>
            <li>
              Your contact information, a good-faith statement, and a statement
              under penalty of perjury.
            </li>
            <li>
              A physical or electronic signature of the copyright owner or
              authorized agent.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Third-Party Services</h2>
          <p className="mt-2">
            The Service may link to third-party sites or apps. We are not
            responsible for their content, policies, or practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            10. Paid Features and Refunds
          </h2>
          <p className="mt-2">
            If Circle offers paid or subscription features, pricing, term,
            cancellation, and refund terms will be shown at purchase. Unless
            stated otherwise, fees are non-refundable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            11. Beta and Experimental Features
          </h2>
          <p className="mt-2">
            Beta features may change, contain bugs, or be discontinued at any
            time. You use beta features at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            12. Disclaimer of Warranties
          </h2>
          <p className="mt-2">
            The Service is provided “as is” without warranties of any kind,
            express or implied. We do not guarantee availability, error-free
            operation, or absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">13. Limitation of Liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, Circle shall not be liable
            for indirect, incidental, consequential, special, exemplary, or
            punitive damages, or loss of data or profits, arising out of your
            use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">14. Indemnification</h2>
          <p className="mt-2">
            You agree to indemnify and hold Circle harmless from claims arising
            out of your breach of these Terms or misuse of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">15. Termination</h2>
          <p className="mt-2">
            You may stop using the Service at any time. We may suspend or
            terminate your account if you violate these Terms, the law, or pose
            risks to other users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            16. Governing Law and Dispute Resolution
          </h2>
          <p className="mt-2">
            These Terms are governed by the laws of the Republic of Indonesia.
            Disputes shall be resolved by competent courts in Indonesia after
            good-faith efforts to settle amicably.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">17. Changes to the Terms</h2>
          <p className="mt-2">
            We may update these Terms from time to time. If changes are
            material, we will provide reasonable notice. Your continued use
            after changes means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">18. Contact</h2>
          <p className="mt-2">
            Questions about these Terms: legal@richardoo.cyou
          </p>
        </section>
      </div>
    </main>
  );
}
