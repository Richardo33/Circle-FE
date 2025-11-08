export default function Privacy() {
  const updated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 text-white">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: {updated}</p>

      <div className="mt-6 space-y-6 text-white/90">
        <section>
          <h2 className="text-xl font-semibold">1. Summary</h2>
          <p className="mt-2">
            This Privacy Policy explains how Circle (“we”) collects, uses,
            shares, and protects personal data when you use our websites and
            applications (the “Service”).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Data We Collect</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Account Data:</strong> name, email/username, password
              hash, profile photo, bio.
            </li>
            <li>
              <strong>User Content:</strong> posts, comments, images, and upload
              metadata.
            </li>
            <li>
              <strong>Device and Log Data:</strong> IP address, device/browser
              type, device identifiers, pages viewed, timestamps, diagnostics.
            </li>
            <li>
              <strong>Approximate Location:</strong> derived from IP or device
              settings unless you provide precise location.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> cookies and
              local storage for authentication, preferences, analytics, and
              security.
            </li>
            <li>
              <strong>Third-Party Data:</strong> when you sign in via third
              parties or when others report your content or behavior.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. How We Use Data</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              Provide and maintain the Service, including authentication and
              social features.
            </li>
            <li>Personalize content and recommendations.</li>
            <li>Ensure security and moderation, and prevent spam and abuse.</li>
            <li>Conduct analytics and improve performance and features.</li>
            <li>
              Communicate with you about updates, support, and policy changes.
            </li>
            <li>Comply with legal obligations and enforce our rights.</li>
          </ul>
          <p className="mt-2 text-sm">
            Legal bases may include consent, performance of a contract,
            legitimate interests, and compliance with law, depending on your
            jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Sharing Data</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Service Providers:</strong> hosting, storage, analytics,
              moderation, and technical support.
            </li>
            <li>
              <strong>Law Enforcement or Regulators:</strong> where required by
              law or to protect rights and safety.
            </li>
            <li>
              <strong>Business Transfers:</strong> in connection with mergers,
              acquisitions, or asset sales, subject to appropriate safeguards.
            </li>
            <li>
              <strong>Parties You Authorize:</strong> when you link accounts or
              share public links.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. International Transfers</h2>
          <p className="mt-2">
            Your data may be processed in other countries. We implement
            appropriate safeguards consistent with applicable law, including
            data processing agreements and contractual obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Data Retention</h2>
          <p className="mt-2">
            We retain data as long as necessary for the purposes described in
            this Policy. You may request account deletion; some data may be
            retained for legal compliance, dispute resolution, and abuse
            prevention.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Security</h2>
          <p className="mt-2">
            We apply reasonable technical and organizational measures such as
            TLS, password hashing, and access controls. No system is entirely
            secure. Keep your credentials safe and enable 2FA if available.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Your Rights</h2>
          <p className="mt-2">
            Depending on local law, you may have rights to access, correct,
            update, or delete your data; object to or restrict certain
            processing; request data portability; and withdraw consent without
            affecting prior processing.
          </p>
          <p className="mt-2">
            To exercise rights or submit requests, contact legal@richardoo.cyou.
            We may require identity verification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Children</h2>
          <p className="mt-2">
            The Service is not intended for children under 13. If we learn that
            we collected data without proper consent, we will take reasonable
            steps to delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Cookies</h2>
          <p className="mt-2">
            We use cookies to authenticate users, remember preferences, analyze
            usage, and enhance security. You can manage cookies in your browser
            settings. Disabling certain cookies may limit functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Third-Party Links</h2>
          <p className="mt-2">
            This Policy does not apply to third-party sites or apps linked from
            the Service. Review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Changes to this Policy</h2>
          <p className="mt-2">
            We may update this Policy from time to time. If changes are
            material, we will provide reasonable notice. Your continued use
            after changes means you accept the updated Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">13. Contact</h2>
          <p className="mt-2">Questions or requests: legal@richardoo.cyou</p>
        </section>
      </div>
    </main>
  );
}
