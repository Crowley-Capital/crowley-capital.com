import React from 'react';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVFooter from '@/components/CCV/CCVFooter';
import { FileText, Mail } from 'lucide-react';

const TermsAndConditions = () => {
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
            Terms & Conditions
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
              <h2 className="text-3xl font-semibold text-black mb-6">1. Website Usage Terms</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                This website is operated by Crowley Capital ("the Firm"). By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined herein. If you do not agree to these terms, please do not use this website.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                The content provided on this website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities or investment products.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">2. Confidentiality</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                All information contained on this website, including but not limited to investment strategies, portfolio composition, research reports, and market commentary, is confidential and proprietary to Crowley Capital.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Users may not reproduce, distribute, publish, or otherwise disseminate any content from this website without prior written consent from the Firm. Unauthorized use or disclosure of confidential information may result in legal action.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">3. Investment Disclaimers</h2>
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">No Investment Advice</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice. Nothing on this website should be construed as a recommendation to buy, sell, or hold any security or investment product.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">Risk of Loss</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Investments in private markets, including venture capital, private equity, and growth-stage companies, involve substantial risk of loss. Past performance is not indicative of future results. Investors should carefully consider their investment objectives, risk tolerance, and financial circumstances before making any investment decisions.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">Forward-Looking Statements</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                This website may contain forward-looking statements regarding market trends, investment opportunities, and economic projections. These statements are based on current expectations and assumptions and are subject to significant business, economic, and competitive uncertainties. Actual results may differ materially from those expressed or implied.
              </p>
              
              <h3 className="text-2xl font-semibold text-black mb-4 mt-6">Professional Consultation</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Before making any investment decision, individuals should consult with their own legal, tax, and financial advisors to assess the suitability of any investment opportunity presented.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">4. Investor Eligibility</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                The investment opportunities referenced on this website are generally available only to accredited investors as defined under Rule 501 of Regulation D of the Securities Act of 1933, as amended, or qualified purchasers as defined under Section 2(a)(51) of the Investment Company Act of 1940, as amended.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By using this website, you represent and warrant that you meet the applicable investor eligibility requirements in your jurisdiction. Crowley Capital reserves the right to verify investor accreditation status before engaging in any investment discussions or transactions.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">5. Jurisdiction and Governing Law</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                This website is controlled and operated from the State of Texas, United States. The Firm makes no representation that materials on this website are appropriate or available for use in other locations. Access to this website from jurisdictions where its contents are illegal is prohibited.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising from or relating to the use of this website shall be subject to the exclusive jurisdiction of the state and federal courts located in Travis County, Texas.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">6. Limitation of Liability</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or relating to the use of this website or the information contained herein, including but not limited to investment losses, lost profits, or business interruption.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                The Firm makes no warranties or representations regarding the accuracy, completeness, timeliness, or reliability of any information on this website. All information is provided "as is" without warranty of any kind.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">7. Intellectual Property</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                All content on this website, including text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Crowley Capital or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Users are granted a limited, non-exclusive, non-transferable license to access and use this website for personal, non-commercial purposes only. Any other use requires prior written permission from the Firm.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">8. Third-Party Links</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                This website may contain links to third-party websites or resources. Crowley Capital does not endorse and is not responsible for the content, products, services, or practices of any third-party websites. Users access third-party links at their own risk and should review the applicable terms and privacy policies of such websites.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">9. Modifications to Terms</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Crowley Capital reserves the right to modify, amend, or update these Terms & Conditions at any time without prior notice. Continued use of this website following any changes constitutes acceptance of the modified terms.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Users are encouraged to review these Terms & Conditions periodically to stay informed of any updates.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">10. Contact Information</h2>
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
                These Terms & Conditions constitute the entire agreement between users and Crowley Capital regarding the use of this website. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CCVFooter />
    </div>
  );
};

export default TermsAndConditions;

