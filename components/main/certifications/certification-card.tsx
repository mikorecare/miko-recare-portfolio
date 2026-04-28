import { Certification } from "./data";

interface CertificationCardProps {
  cert: Certification;
  index: number;
}

export default function CertificationCard({
  cert,
  index,
}: CertificationCardProps) {
  return (
    <div className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden transition-all duration-300">
      <div className="p-2 sm:p-3">
        <div className="flex justify-between items-start flex-wrap gap-1">
          <h3 className="font-masonic text-amber-800 text-[6px] sm:text-xs md:text-sm font-bold tracking-wider">
            {cert.title}
          </h3>
          <span className="font-masonic text-stone-500 text-[4px] sm:text-[6px] md:text-xs bg-amber-200/50 px-1 sm:px-2 py-0.5 rounded whitespace-nowrap">
            {cert.issuedDate}
          </span>
        </div>

        <p className="font-masonic text-amber-700 text-[5px] sm:text-[8px] md:text-xs mt-1">
          {cert.platform}
        </p>

        {cert.credentialId && (
          <p className="font-masonic text-stone-400 text-[4px] sm:text-[6px] mt-1">
            ID: {cert.credentialId}
          </p>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-masonic text-amber-600 hover:text-amber-800 text-[4px] sm:text-[7px] mt-2 inline-block transition-colors"
          >
            [verify] →
          </a>
        )}

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className="font-masonic text-amber-600/50 text-[4px] sm:text-[6px] tracking-wider"
              >
                ✦ {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
