import {
  mainStacks,
  cloudAndDevOps,
  stylingAndDesign,
  softSkills,
} from "@/components/main/about/data";
import StackIcon from "tech-stack-icons";

export const StacksModalContent = () => {
  return (
    <div className="space-y-6">
      {/* Main Stacks */}
      <div>
        <h3 className="font-montserrat text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
          PRIMARY ARSENAL
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {mainStacks.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg
                        bg-gray-800/50 border border-gray-700 
                        hover:border-cyan-500/50 hover:bg-gray-800/80
                        transition-all duration-200"
            >
              <StackIcon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-poppins text-xs md:text-sm text-gray-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud & DevOps */}
      <div>
        <h3 className="font-montserrat text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
          CLOUD & DEVOPS
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {cloudAndDevOps.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg
                        bg-gray-800/50 border border-gray-700 
                        hover:border-cyan-500/50 hover:bg-gray-800/80
                        transition-all duration-200"
            >
              <StackIcon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-poppins text-xs md:text-sm text-gray-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Design & Styling */}
      <div>
        <h3 className="font-montserrat text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
          DESIGN & STYLING
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {stylingAndDesign.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg
                        bg-gray-800/50 border border-gray-700 
                        hover:border-cyan-500/50 hover:bg-gray-800/80
                        transition-all duration-200"
            >
              <StackIcon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-poppins text-xs md:text-sm text-gray-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="font-montserrat text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
          VIRTUES
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {softSkills.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg
                        bg-gray-800/50 border border-gray-700 
                        hover:border-cyan-500/50 hover:bg-gray-800/80
                        transition-all duration-200"
            >
              <StackIcon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-poppins text-xs md:text-sm text-gray-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
