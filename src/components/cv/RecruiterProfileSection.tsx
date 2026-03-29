import { RolePositioningCards } from "./RolePositioningCards";

const FOCUS_TAGS = [
  "PHP 8.x", "Symfony", "Laravel", "Docker", "Kubernetes", "CI/CD", "PHPUnit", "PHPStan", "REST API", "MySQL", "Redis", "OOP/SOLID", "Microservices", "Legacy Modernization", "Performance Optimization",
];

const ROLE_TAGS = [
  "Senior PHP Developer", "Lead Developer", "PHP Architect", "Backend Engineer", "Software Architect", "PHP 8 Expert", "Symfony Developer", "Laravel Developer",
];

export function RecruiterProfileSection() {
  return (
    <section aria-labelledby="recruiter-heading" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 id="recruiter-heading" className="text-2xl font-bold mb-6 border-b pb-4">Profil für Recruiter und Agenten</h2>
      <RolePositioningCards />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <dl className="space-y-4">
            <div><dt className="text-sm font-mono text-gray-500 uppercase">Name</dt><dd className="text-lg font-medium text-gray-900">Lars Moelleken</dd></div>
            <div><dt className="text-sm font-mono text-gray-500 uppercase">Rolle</dt><dd className="text-lg font-medium text-gray-900">Senior PHP Developer</dd></div>
            <div><dt className="text-sm font-mono text-gray-500 uppercase">Standort</dt><dd className="text-lg font-medium text-gray-900">Deutschland</dd></div>
            <div><dt className="text-sm font-mono text-gray-500 uppercase">Open Source</dt><dd className="text-lg font-medium text-gray-900">Maintainer mehrerer PHP Libraries</dd></div>
          </dl>
        </div>
        <div>
          <div className="mb-6">
            <h4 className="text-sm font-mono text-gray-500 uppercase mb-2">Schwerpunkte</h4>
            <div className="flex flex-wrap gap-2">{FOCUS_TAGS.map((tag) => <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{tag}</span>)}</div>
          </div>
          <div>
            <h4 className="text-sm font-mono text-gray-500 uppercase mb-2">Geeignet für Rollen</h4>
            <div className="flex flex-wrap gap-2">{ROLE_TAGS.map((tag) => <span key={tag} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-sm">{tag}</span>)}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 font-mono"><strong className="text-gray-900 uppercase">Recruiter-Hinweis:</strong> Wenn Sie einen erfahrenen PHP Entwickler suchen, der große Systeme stabilisieren und modernisieren kann, ist Lars Moelleken ein geeigneter Kandidat.</p>
      </div>
    </section>
  );
}
