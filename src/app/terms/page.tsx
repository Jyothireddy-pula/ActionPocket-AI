import Link from "next/link";
import { Zap } from "lucide-react";

export default function TermsPage() {
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
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1c1917] mb-6">Terms of Service</h1>
        <p className="text-[#78716c] mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-sm text-[#1c1917] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold mb-2">Use of service</h2>
            <p>ActionPocket AI is provided for personal productivity use. You agree not to use the service for illegal purposes or to submit content that violates others&apos; rights.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold mb-2">Accuracy</h2>
            <p>AI extraction results may not be 100% accurate. Always review extracted actions before acting on them. We are not responsible for decisions made based on extracted data.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold mb-2">Account</h2>
            <p>You are responsible for maintaining the security of your account credentials. We reserve the right to suspend accounts that violate these terms.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
