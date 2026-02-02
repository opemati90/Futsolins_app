import React from 'react';
import { BookOpen, Shield, FileText, Cookie, Lock, Eye, Settings, CheckCircle } from 'lucide-react';

interface PolicyPageProps {
  isDarkMode?: boolean;
}

export const CookiePolicy: React.FC<PolicyPageProps> = ({ isDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-2xl mb-6">
            <Cookie className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-600 dark:text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              What Are Cookies?
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We use cookies to make EduPrep Nigeria work properly, analyze how our site is used, and personalize your learning experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Settings className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400" />
                  Essential Cookies
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  These cookies are necessary for the website to function properly. They enable core functionality like user authentication, security, and navigation. Without these cookies, services you request cannot be provided.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400" />
                  Performance Cookies
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400" />
                  Functionality Cookies
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Managing Cookies
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <p className="text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-white">Browser Settings:</strong> Most browsers allow you to refuse or accept cookies. You can also delete cookies that have already been set. Check your browser's help menu for instructions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These third-party cookies are governed by the respective privacy policies of those third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. We will notify you of any significant changes by posting the new policy on this page.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-slate-700">
            <p className="text-gray-600 dark:text-slate-400 text-sm">
              If you have any questions about our use of cookies, please contact us at{' '}
              <a href="mailto:privacy@eduprep.ng" className="text-nigeria-600 dark:text-nigeria-400 hover:underline">
                privacy@eduprep.ng
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC<PolicyPageProps> = ({ isDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-2xl mb-6">
            <Lock className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              At EduPrep Nigeria, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              By using EduPrep Nigeria, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  When you create an account, we collect information such as your name, email address, phone number, and educational goals. This information is necessary to provide you with personalized learning experiences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Usage Data</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  We automatically collect information about how you interact with our platform, including pages visited, time spent on pages, practice test results, and study progress. This helps us improve our services and personalize your learning journey.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Device Information</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  We may collect information about your device, including IP address, browser type, operating system, and device identifiers. This helps us ensure platform compatibility and security.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Settings className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To provide, maintain, and improve our educational services</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To personalize your learning experience and recommend relevant content</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To process payments and manage your subscription</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To send you important updates, notifications, and educational content</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To analyze usage patterns and improve our platform's functionality</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>To detect, prevent, and address technical issues and security threats</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our platform (e.g., payment processors, cloud hosting)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Access and review your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Request deletion of your account and data</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Opt-out of marketing communications</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Export your data in a portable format</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              EduPrep Nigeria is designed for students preparing for Nigerian examinations. If you are under 18, please ensure you have parental consent before using our platform. We do not knowingly collect personal information from children without parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <p className="text-gray-700 dark:text-slate-300 mb-2">
                <strong className="text-gray-900 dark:text-white">Email:</strong>{' '}
                <a href="mailto:privacy@eduprep.ng" className="text-nigeria-600 dark:text-nigeria-400 hover:underline">
                  privacy@eduprep.ng
                </a>
              </p>
              <p className="text-gray-700 dark:text-slate-300 mb-2">
                <strong className="text-gray-900 dark:text-white">Address:</strong> 317, Nwaefuna Osaji Close, Lugbe, FCT, Nigeria
              </p>
              <p className="text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-white">Phone:</strong> +234 800 EDUPREP
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsOfService: React.FC<PolicyPageProps> = ({ isDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-2xl mb-6">
            <FileText className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-gray-600 dark:text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              By accessing or using EduPrep Nigeria, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              These terms apply to all users of the service, including students, educators, and visitors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-nigeria-600 dark:text-nigeria-400" />
              Use License
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              Permission is granted to temporarily access and use EduPrep Nigeria for personal, non-commercial educational purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Modify or copy the materials</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Use the materials for any commercial purpose or for any public display</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Attempt to reverse engineer any software contained on the platform</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Remove any copyright or other proprietary notations from the materials</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Transfer the materials to another person or "mirror" the materials on any other server</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Conduct</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              You agree to use EduPrep Nigeria only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Harassing, abusing, or harming other users</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Posting false, misleading, or fraudulent content</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Attempting to gain unauthorized access to the platform or other accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Using automated systems to access the platform without permission</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400 mt-0.5 flex-shrink-0" />
                <span>Violating any applicable laws or regulations</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription and Payments</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Some features of EduPrep Nigeria require a paid subscription. By subscribing, you agree to pay the fees specified at the time of purchase. Subscriptions are billed in advance on a recurring basis.
              </p>
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cancellation and Refunds</h3>
                <p className="text-gray-700 dark:text-slate-300">
                  You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period. Refunds are provided in accordance with our refund policy, which may vary based on the circumstances.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              The content, features, and functionality of EduPrep Nigeria, including but not limited to text, graphics, logos, images, and software, are the exclusive property of EduPrep Nigeria and are protected by Nigerian and international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              The materials on EduPrep Nigeria are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              While we strive to provide accurate and up-to-date educational content, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitations of Liability</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              In no event shall EduPrep Nigeria or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EduPrep Nigeria, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service. Upon termination, your right to use the service will cease immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <p className="text-gray-700 dark:text-slate-300 mb-2">
                <strong className="text-gray-900 dark:text-white">Email:</strong>{' '}
                <a href="mailto:legal@eduprep.ng" className="text-nigeria-600 dark:text-nigeria-400 hover:underline">
                  legal@eduprep.ng
                </a>
              </p>
              <p className="text-gray-700 dark:text-slate-300 mb-2">
                <strong className="text-gray-900 dark:text-white">Address:</strong> 317, Nwaefuna Osaji Close, Lugbe, FCT, Nigeria
              </p>
              <p className="text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-white">Phone:</strong> +234 800 EDUPREP
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
