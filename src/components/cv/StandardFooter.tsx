import { Code2, Globe, Mail } from "lucide-react";
import { useCvCopy } from "./copy";
import { getContactChannel } from "../../webmcp/profileData";

export function StandardFooter() {
  const copy = useCvCopy();
  const email = getContactChannel("email");
  const linkedin = getContactChannel("linkedin");
  const github = getContactChannel("github");
  const blog = getContactChannel("blog");

  return (
    <footer className="bg-gray-900 text-white py-16 mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{copy.standardFooter.contactTitle}</h2>
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 text-gray-300">
          <a href={email?.href} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Mail className="w-6 h-6" />
            <span>{email?.visibleLabel}</span>
          </a>
          <a href={linkedin?.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Globe className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          <a href={github?.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-400 transition-colors">
            <Code2 className="w-6 h-6" />
            <span>GitHub</span>
          </a>
          <a href={blog?.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Globe className="w-6 h-6" />
            <span>Blog ({blog?.visibleLabel})</span>
          </a>
        </div>
        <p className="mt-12 text-gray-500 text-sm font-mono">Optimized for LLM Parsing and Human Readability.</p>
      </div>
    </footer>
  );
}
