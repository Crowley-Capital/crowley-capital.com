import React from 'react';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVFooter from '@/components/CCV/CCVFooter';
import { FileText, Mail, Phone } from 'lucide-react';

const LinkedInAPITerms = () => {
  return (
    <div className="min-h-screen bg-white">
      <CCVNavbar />
      
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8 bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-6">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-light leading-tight">
            LinkedIn API Terms & Privacy
          </h1>
          <p className="text-xl text-slate-300">
            Crowley Capital Ventures, LLC
          </p>
          <p className="text-lg text-slate-400">
            Last updated: November 10, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <div className="space-y-12">
            <div className="bg-slate-50 border-l-4 border-black p-8 rounded-r-xl">
              <p className="text-lg leading-relaxed text-slate-700 m-0">
                These LinkedIn API Terms & Privacy Disclosures ("LinkedIn Terms") explain how Crowley Capital Ventures, LLC ("we," "us," "our") uses LinkedIn's APIs to create posts on our LinkedIn Company Page and to view basic analytics related to those posts. These terms supplement our Website Privacy Policy and Website Terms.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">1. What our integration does</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We use LinkedIn's official APIs to:
              </p>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>Publish content to our LinkedIn Company Page.</li>
                <li>Manage page posts and view high-level engagement metrics.</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                We do not use this integration to access member inboxes, scrape profiles, conduct automated outreach, or perform other activities unrelated to company page management.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">2. Authorization & scopes (OAuth 2.0)</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Access is granted through LinkedIn's OAuth 2.0 flow. We never see or store your LinkedIn password.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We request only the minimum permissions required to operate our page workflow. Depending on your role, our app may request one or more of the following LinkedIn scopes:
              </p>
              <ul className="space-y-3 text-lg text-slate-700">
                <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">w_organization_social</code> (publish posts on a Company Page you manage)</li>
                <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">r_organization_social</code> (read basic analytics and social metadata for that page)</li>
                <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">r_organization_admin</code> (confirm the organizations/pages you are authorized to act on)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">3. Data we access via LinkedIn APIs</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Depending on your permissions and our feature set, we may access:
              </p>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>Organization/Page identifiers and permissions required to create/manage posts.</li>
                <li>Post content you provide to us (text, media, links, hashtags).</li>
                <li>Aggregated or high-level post analytics (impressions, clicks, reactions, comments count).</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                We do not request or store sensitive personal data from LinkedIn members via this integration.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">4. Purpose of processing</h2>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>Create and schedule posts on our official LinkedIn Company Page.</li>
                <li>Measure high-level performance of our Page content.</li>
                <li>Ensure operational integrity, security, and abuse prevention.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">5. Data storage & retention</h2>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>Access tokens are stored securely (encrypted at rest, limited access) and refreshed/expired per LinkedIn policy.</li>
                <li>Post content is retained as part of our business records. You may request removal of content you provided to us prior to posting; once published on LinkedIn, deletion is controlled by LinkedIn's systems.</li>
                <li>Analytics may be stored in aggregated or de-identified form where feasible.</li>
                <li>We retain LinkedIn-derived data only as long as needed for the purposes above or to meet legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">6. Security</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We apply least-privilege access controls, encryption in transit and at rest, secrets management, credential rotation, and audit logging. Tokens/credentials are not hard-coded.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">7. Sharing & processors</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We do not sell LinkedIn-derived data. We may share limited data with service providers (e.g., cloud hosting, logging, monitoring) strictly to operate this integration, under confidentiality and data-processing terms.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">8. Your choices & revocation</h2>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>You can revoke our app's access at any time in your LinkedIn account settings.</li>
                <li>You can request that we delete LinkedIn-derived personal data we control (see Section 10).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">9. Prohibited uses</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We comply with LinkedIn's platform policies. We do not scrape data, misrepresent identity, automate member interactions, circumvent rate limits, or request unnecessary scopes. We only request the minimum access required to post on our Page and retrieve basic analytics.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">10. Data subject rights & deletion</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                If you believe we control your personal data obtained via LinkedIn APIs, you may request access, correction, or deletion. We will honor verified requests unless a legal obligation or exception applies.
              </p>
              <div className="bg-black text-white p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">How to request deletion:</h3>
                <p className="text-slate-200 mb-4">
                  Email <a href="mailto:jakecrowley05@gmail.com" className="underline hover:text-slate-300">jakecrowley05@gmail.com</a> with the subject "LinkedIn Data Deletion." Include:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-200">
                  <li>Your name</li>
                  <li>Your LinkedIn profile URL (if applicable)</li>
                  <li>Details of your request</li>
                </ol>
                <p className="text-slate-200 mt-4">
                  We will respond within applicable statutory timelines.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">11. International transfers</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We may process and store data in the United States and other countries where we or our providers operate. Where required, we implement appropriate safeguards for cross-border transfers.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">12. Legal basis (EEA/UK/CH)</h2>
              <ul className="space-y-3 text-lg text-slate-700">
                <li>Legitimate interests to administer our LinkedIn Page and communicate about our business.</li>
                <li>Consent where required for specific features or communications.</li>
                <li>Contract where you provide content for posting under an agreement with us.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">13. Children</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our LinkedIn integration is not directed to children. We do not knowingly process children's personal data via LinkedIn APIs.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">14. Changes to these LinkedIn Terms</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We may update these LinkedIn Terms from time to time. Material changes will be posted on this page with a new "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">15. Contact</h2>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-8 rounded-xl space-y-4">
                <p className="text-2xl font-semibold text-black">Crowley Capital Ventures, LLC</p>
                <div className="space-y-3 text-lg text-slate-700">
                  <p>PO BOX 11605<br/>Austin, TX 78758</p>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-500" />
                    <a href="mailto:jakecrowley05@gmail.com" className="text-black underline hover:text-slate-700">
                      jakecrowley05@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-500" />
                    <a href="tel:989-565-0223" className="text-black underline hover:text-slate-700">
                      989-565-0223
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CCVFooter />
    </div>
  );
};

export default LinkedInAPITerms;

