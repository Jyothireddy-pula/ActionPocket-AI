import Link from "next/link";
import { Zap } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <header className="border-b border-[#e5e4e2] bg-white p-4 sm:p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[#1c1917]">ActionPocket AI</span>
        </Link>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-12 prose prose-sm">
        <h1 className="text-2xl font-bold text-[#1c1917] mb-6">Privacy Policy</h1>
        <p className="text-[#78716c] mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-sm text-[#1c1917] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold mb-2">What we collect</h2>
            <p>We collect your email address for authentication, and the text you submit for action extraction. We do not sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold mb-2">How we use your data</h2>
            <p>Your captures and extracted actions are stored securely and are only accessible to you. We use AI providers to process your text; this is done securely and your data is not used to train models.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold mb-2">Data retention</h2>
            <p>Your data is retained until you delete it or request account deletion. You can export or delete all your data from the Settings page.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold mb-2">Contact</h2>
            <p>For privacy questions, contact us at privacy@actionpocket.ai</p>
          </section>
        </div>
      </main>
    </div>
  );
}
