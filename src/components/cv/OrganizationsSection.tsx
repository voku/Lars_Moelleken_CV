import { UserCheck } from "lucide-react";

export function OrganizationsSection() {
  return (
    <section aria-labelledby="orgs-heading">
      <h2 id="orgs-heading" className="text-3xl font-bold mb-8 flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-blue-600" />
        Organisationen
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 inline-flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
          PHP
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">PHP-UG Düsseldorf</h3>
          <p className="text-sm text-gray-500">PHP Usergroup Düsseldorf</p>
        </div>
      </div>
    </section>
  );
}
