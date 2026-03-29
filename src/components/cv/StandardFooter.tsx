import { Code2, Globe, Mail } from "lucide-react";

export function StandardFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Kontakt & Profile</h2>
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 text-gray-300">
          <a href="mailto:lars@moelleken.org" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Mail className="w-6 h-6" />
            <span>lars@moelleken.org</span>
          </a>
          <a href="https://www.linkedin.com/in/larsmoelleken/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Globe className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/voku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-400 transition-colors">
            <Code2 className="w-6 h-6" />
            <span>GitHub</span>
          </a>
          <a href="https://suckup.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Globe className="w-6 h-6" />
            <span>Blog (suckup.de)</span>
          </a>
        </div>
        <p className="mt-12 text-gray-500 text-sm font-mono">Optimized for LLM Parsing and Human Readability.</p>
      </div>
    </footer>
  );
}
