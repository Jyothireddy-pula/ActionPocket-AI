import Link from "next/link";
import { Zap, Mail, FileText, CheckCircle, Shield, ArrowRight, Inbox, Clock, Tag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="border-b border-[#e5e4e2] bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-[#1c1917] text-lg">ActionPocket AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              How it works
            </Link>
            <Link href="#use-cases" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Use cases
            </Link>
            <Link href="#privacy" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Privacy
            </Link>
            <Link href="/login" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get started free
            </Link>
          </nav>
          <div className="flex md:hidden gap-2">
            <Link href="/login" className="text-sm text-[#78716c] px-3 py-2">Login</Link>
            <Link href="/signup" className="text-sm bg-indigo-600 text-white px-3 py-2 rounded-lg">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            AI-powered action extraction
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917] leading-tight mb-6">
            Turn any text into
            <span className="text-indigo-600"> organized actions</span>
          </h1>
          <p className="text-lg text-[#78716c] mb-8 max-w-2xl mx-auto">
            Paste emails, meeting notes, or any text. ActionPocket AI extracts your to-dos,
            sets priorities, and keeps everything organized so nothing falls through the cracks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 border border-[#e5e4e2] bg-white text-[#1c1917] px-6 py-3 rounded-lg font-medium hover:bg-[#f5f4f2] transition-colors"
            >
              Try demo
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] text-center mb-3">
            How it works
          </h2>
          <p className="text-[#78716c] text-center mb-12">Three simple steps to stay on top of everything</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Inbox className="w-6 h-6 text-indigo-600" />,
                step: "1",
                title: "Capture",
                description: "Paste any text — emails, meeting notes, Slack messages, or anything with tasks buried inside.",
              },
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                step: "2",
                title: "AI extracts",
                description: "Our AI identifies action items, sets priorities based on urgency language, and spots due dates.",
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
                step: "3",
                title: "Organize & act",
                description: "Review extracted actions, edit as needed, and track them to completion with due dates and tags.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-[8px] border border-[#e5e4e2]">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-indigo-600 mb-2">Step {item.step}</div>
                <h3 className="text-lg font-semibold text-[#1c1917] mb-2">{item.title}</h3>
                <p className="text-[#78716c] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] text-center mb-3">
            Built for real workflows
          </h2>
          <p className="text-[#78716c] text-center mb-12">ActionPocket AI handles the chaos of modern work</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Mail className="w-5 h-5 text-indigo-600" />,
                title: "Long email threads",
                description: "Paste email chains and extract every commitment, request, and follow-up in seconds.",
              },
              {
                icon: <FileText className="w-5 h-5 text-indigo-600" />,
                title: "Meeting notes",
                description: "Turn meeting transcripts and notes into a clean list of who needs to do what and by when.",
              },
              {
                icon: <Clock className="w-5 h-5 text-indigo-600" />,
                title: "Project briefs",
                description: "Break down project documents into actionable tasks with priorities and deadlines.",
              },
              {
                icon: <Tag className="w-5 h-5 text-indigo-600" />,
                title: "Slack & chat messages",
                description: "Capture scattered conversation threads and extract the tasks before they're forgotten.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-white rounded-[8px] border border-[#e5e4e2]">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1917] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#78716c] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1c1917] mb-3">Your data stays yours</h2>
          <p className="text-[#78716c] mb-6 leading-relaxed">
            We never sell your data. Your captures and actions are stored securely in your own database
            partition. You can export or delete all your data at any time from settings.
          </p>
          <Link href="/privacy" className="text-sm text-indigo-600 hover:underline">
            Read our privacy policy →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e4e2] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-[#1c1917]">ActionPocket AI</span>
          </div>
          <div className="flex gap-4 text-sm text-[#78716c]">
            <Link href="/privacy" className="hover:text-[#1c1917]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#1c1917]">Terms</Link>
          </div>
          <div className="text-sm text-[#78716c]">
            © {new Date().getFullYear()} ActionPocket AI
          </div>
        </div>
      </footer>
    </div>
  );
}
