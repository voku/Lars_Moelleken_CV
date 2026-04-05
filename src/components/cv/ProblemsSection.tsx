import { AlertTriangle } from "lucide-react";
import { useCvCopy } from "./copy";

export function ProblemsSection() {
  const copy = useCvCopy();

  return (
    <section id="problems" aria-labelledby="problems-heading">
      <h2 id="problems-heading" className="text-3xl font-bold mb-8 flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-blue-600" />
        {copy.problems.title}
      </h2>
      <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl">
        <p className="text-amber-900 font-medium mb-6">{copy.problems.intro}</p>
        <ul className="grid sm:grid-cols-2 gap-4 text-amber-800">
          {copy.problems.items.map((problem) => (
            <li key={problem} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              <span>{problem}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
