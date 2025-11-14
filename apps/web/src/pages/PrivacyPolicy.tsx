import React from 'react';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVFooter from '@/components/CCV/CCVFooter';
import { FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-400">
            Last Updated: November 14, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">1. Introduction</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Crowley Capital ("the Firm," "we," "us," or "our") is committed to protecting the privacy and security of personal information collected through this website. This Privacy Policy describes how we collect, use, store, share, and protect information about visitors and users of our website.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our practices, please do not use this website.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">2. Information We Collect</h2>
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">2.1 Information You Provide</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We collect information that you voluntarily provide when you:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• Submit contact forms or consultation requests</li>
                <li>• Subscribe to our newsletter or research publications</li>
                <li>• Register for events or webinars</li>
                <li>• Communicate with us via email or other channels</li>
                <li>• Schedule meetings or consultations through our booking system</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                This information may include: name, email address, company name, job title, phone number, investment interests, and any other information you choose to provide.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain technical information, including:
              </p>
              <ul className="space-y-2 text-lg text-slate-700">
                <li>• IP address and approximate geographic location</li>
                <li>• Browser type and version</li>
                <li>• Operating system</li>
                <li>• Device information</li>
                <li>• Pages visited and time spent on each page</li>
                <li>• Referring website or source</li>
                <li>• Date and time of access</li>
              </ul>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                We use cookies, web beacons, and similar technologies to enhance user experience, analyze website traffic, and track user behavior. You may disable cookies through your browser settings, though this may limit certain website functionality.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">3. How We Use Your Information</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital uses collected information for the following purposes:
              </p>
              <ul className="space-y-2 text-lg text-slate-700">
                <li>• <strong>Communication:</strong> Respond to inquiries, schedule consultations, and provide requested information</li>
                <li>• <strong>Investment Opportunities:</strong> Share information about investment opportunities, market insights, and research publications</li>
                <li>• <strong>Event Management:</strong> Coordinate event registrations, send event reminders, and provide event-related updates</li>
                <li>• <strong>Website Improvement:</strong> Analyze user behavior to improve website functionality, content, and user experience</li>
                <li>• <strong>Marketing and Outreach:</strong> Send newsletters, market commentary, and information about our services (with opt-out option)</li>
                <li>• <strong>Compliance and Legal Obligations:</strong> Verify investor accreditation, maintain regulatory compliance, and fulfill legal requirements</li>
                <li>• <strong>Security:</strong> Protect against fraudulent, unauthorized, or illegal activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">4. Information Retention</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Factors influencing retention periods include:
              </p>
              <ul className="space-y-2 text-lg text-slate-700">
                <li>• The nature and sensitivity of the information</li>
                <li>• Legal, regulatory, and compliance obligations</li>
                <li>• Potential risks from unauthorized use or disclosure</li>
                <li>• Business and operational requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">5. Information Sharing and Disclosure</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital does not sell, rent, or trade personal information to third parties. We may share information in the following circumstances:
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">5.1 Service Providers</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We engage trusted third-party service providers to support website operations, including:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• Email marketing and communication platforms</li>
                <li>• Calendar and scheduling services</li>
                <li>• Web analytics providers</li>
                <li>• Cloud hosting and data storage services</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">5.2 Business Transfers</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                In the event of a merger, acquisition, reorganization, or sale of assets, personal information may be transferred as part of the transaction. Users will be notified of any such change in ownership or control.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">5.3 Legal Requirements</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                We may disclose personal information when required by law, regulation, legal process, or governmental request, or when necessary to protect the rights, property, or safety of Crowley Capital, our users, or others.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">6. Third-Party Services</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Our website integrates with third-party services, including:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• <strong>Calendly:</strong> Meeting scheduling platform</li>
                <li>• <strong>Substack:</strong> Newsletter and content distribution</li>
                <li>• <strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                <li>• <strong>Social Media Platforms:</strong> LinkedIn, Instagram, Facebook</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                These third-party services have their own privacy policies and data collection practices. We encourage users to review the privacy policies of any third-party services they interact with through our website.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">7. Data Security</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital implements industry-standard security measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• Encryption of data transmission using SSL/TLS protocols</li>
                <li>• Secure data storage with access controls</li>
                <li>• Regular security assessments and updates</li>
                <li>• Employee training on data protection and confidentiality</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                However, no method of transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">8. Your Rights and Choices</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Depending on your jurisdiction, you may have certain rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• <strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal information, subject to legal and operational requirements</li>
                <li>• <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time by clicking the unsubscribe link in our emails</li>
                <li>• <strong>Data Portability:</strong> Request a copy of your personal information in a structured, commonly used format</li>
                <li>• <strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                To exercise these rights, please contact us at jakecrowley05@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">9. GDPR Compliance (European Users)</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                For users in the European Economic Area (EEA), Crowley Capital complies with the General Data Protection Regulation (GDPR). Our legal basis for processing personal information includes:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• <strong>Consent:</strong> When you provide explicit consent for specific processing activities</li>
                <li>• <strong>Contractual Necessity:</strong> When processing is necessary to fulfill contractual obligations</li>
                <li>• <strong>Legitimate Interests:</strong> When processing serves our legitimate business interests and does not override your rights</li>
                <li>• <strong>Legal Obligations:</strong> When processing is required to comply with legal requirements</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                EEA users have additional rights under GDPR, including the right to lodge a complaint with a supervisory authority.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">10. CCPA Compliance (California Users)</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                For California residents, Crowley Capital complies with the California Consumer Privacy Act (CCPA). California users have specific rights regarding their personal information:
              </p>
              <ul className="space-y-2 text-lg text-slate-700 mb-4">
                <li>• <strong>Right to Know:</strong> Request disclosure of personal information collected, used, and shared</li>
                <li>• <strong>Right to Delete:</strong> Request deletion of personal information, subject to exceptions</li>
                <li>• <strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (note: we do not sell personal information)</li>
                <li>• <strong>Non-Discrimination:</strong> You will not be discriminated against for exercising your CCPA rights</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                To exercise CCPA rights, contact us at jakecrowley05@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">11. Children's Privacy</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                This website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child, we will take steps to delete such information promptly.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">12. International Data Transfers</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. These countries may have data protection laws that differ from those in your jurisdiction.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                When transferring data internationally, we implement appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">13. Changes to This Privacy Policy</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital reserves the right to update this Privacy Policy periodically to reflect changes in our practices, technologies, legal requirements, or business operations. Material changes will be communicated through website notice or direct communication.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Continued use of the website following policy updates constitutes acceptance of the revised Privacy Policy. Users are encouraged to review this policy regularly.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">14. Contact Information</h2>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-8 rounded-xl space-y-4">
                <p className="text-2xl font-semibold text-black">Crowley Capital</p>
                <div className="space-y-3 text-lg text-slate-700">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-500" />
                    <a href="mailto:jakecrowley05@gmail.com" className="text-black underline hover:text-slate-700">
                      jakecrowley05@gmail.com
                    </a>
                  </div>
                  <p>Location: Austin, Texas</p>
                </div>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mt-6">
                We will respond to privacy inquiries within 30 days of receipt.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                This Privacy Policy is designed to comply with applicable data protection laws, including GDPR and CCPA. Users should consult with legal counsel regarding specific privacy concerns or compliance requirements in their jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CCVFooter />
    </div>
  );
};

export default PrivacyPolicy;

