import { useModal } from "../../modal/modal";
import { StacksModalContent } from "../../modal/stack-modal-content";
import { AwardsModalContent } from "../../modal/awards-modal-content";
import { ExperiencesModalContent } from "../../modal/experiences-modal-content";
import { TrainingsModalContent } from "../../modal/training-modal-content";
import { ProjectsModalContent } from "../../modal/projects-modal-content";

export interface HotZone {
  id: string;
  name: string;
  type: "polygon" | "circle";
  points?: number[][];
  cx?: number;
  cy?: number;
  r?: number;
  onClick: () => void;
}

export const useHotZones = (
  onBack: () => void,
  onToggleTheme?: () => void,
  showModal?: (content: React.ReactNode, options?: any) => void,
) => {
  const hotZones: HotZone[] = [
    {
      id: "switch",
      name: "Turn On/Off",
      type: "circle",
      cx: 0.04,
      cy: 0.6,
      r: 0.057,
      onClick: () => onToggleTheme?.(),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "circle",
      cx: 0.08,
      cy: 0.3,
      r: 0.057,
      onClick: () =>
        window.open("https://www.linkedin.com/in/miko-recare/", "_blank"),
    },
    {
      id: "github",
      name: "Github",
      type: "circle",
      cx: 0.159,
      cy: 0.32,
      r: 0.05,
      onClick: () => window.open("https://github.com/mikorecare", "_blank"),
    },
    {
      id: "awards",
      name: "Awards",
      type: "polygon",
      points: [
        [0.226, 0.06],
        [0.315, 0.17],
        [0.315, 0.374],
        [0.226, 0.36],
      ],
      onClick: () =>
        showModal?.(<AwardsModalContent />, {
          title: "AWARDS & RECOGNITION",
          maxWidth: "lg",
        }),
    },
    {
      id: "stacks",
      name: "Stacks",
      type: "polygon",
      points: [
        [0.06, 0.405],
        [0.295, 0.41],
        [0.295, 0.71],
        [0.064, 1],
      ],
      onClick: () =>
        showModal?.(<StacksModalContent />, {
          title: "TECH STACKS",
          maxWidth: "xl",
        }),
    },
    {
      id: "blogs",
      name: "Blogs",
      type: "polygon",
      points: [
        [0.364, 0.27],
        [0.42, 0.27],
        [0.42, 0.374],
        [0.366, 0.372],
      ],
      onClick: () => (window.location.href = "/blogs")
    },
    {
      id: "Show Hero",
      name: "Show Hero",
      type: "polygon",
      points: [
        [0.443, 0.34],
        [0.54, 0.34],
        [0.54, 0.39],
        [0.443, 0.39],
      ],
      onClick: onBack,
    },
    {
      id: "contact",
      name: "Contact Me",
      type: "polygon",
      points: [
        [0.425, 0.78],
        [0.575, 0.78],
        [0.596, 0.9],
        [0.405, 0.9],
      ],
      onClick: () => (window.location.href = "mailto:mikorecare@gmail.com"),
    },
    {
      id: "experiences",
      name: "Experiences",
      type: "polygon",
      points: [
        [0.34, 0.43],
        [0.428, 0.425],
        [0.428, 0.556],
        [0.344, 0.61],
      ],
      onClick: () =>
        showModal?.(<ExperiencesModalContent />, {
          title: "EXPERIENCES",
          maxWidth: "lg",
        }),
    },
    {
      id: "projects",
      name: "Projects",
      type: "polygon",
      points: [
        [0.427, 0.422],
        [0.555, 0.422],
        [0.555, 0.557],
        [0.427, 0.557],
      ],
      onClick: () =>
        showModal?.(<ProjectsModalContent />, {
          title: "PROJECTS HANDLED",
          maxWidth: "lg",
        }),
    },
    {
      id: "trainings",
      name: "Trainings",
      type: "polygon",
      points: [
        [0.557, 0.384],
        [0.612, 0.384],
        [0.61, 0.582],
        [0.556, 0.58],
      ],
      onClick: () =>
        showModal?.(<TrainingsModalContent />, {
          title: "TRAININGS & CERTIFICATIONS",
          maxWidth: "lg",
        }),
    },
    {
      id: "download_cv",
      name: "Download CV",
      type: "polygon",
      points: [
        [0.59, 0.815],
        [0.68, 0.809],
        [0.74, 0.965],
        [0.63, 0.99],
      ],
      onClick: () => {
        const link = document.createElement("a");
        link.href = "/resume/Miko Recare CV.pdf";
        link.download = "Miko_Recare_CV.pdf";
        link.click();
      },
    },
  ];

  return hotZones;
};
