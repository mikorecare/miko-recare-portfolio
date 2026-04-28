// qa-config.ts

export type AnimationSet = "open-arms" | "raising-finger";

export const qaDatabase: Record<
  string,
  {
    frames: {
      text: string;
      animationSet: AnimationSet;
      endFrame: number;
    }[];
  }
> = {
  "who am i?": {
    frames: [
      {
        text: "Ah, curious about the developer behind this medieval realm?",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I am Miko Recare, a full-stack developer from General Trias, Philippines.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I specialize in React, Angular, NestJS, and Flutter.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I turn wireframes into legendary digital experiences with the precision of a master blacksmith.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "Bachelor's in IT from Cavite State University. Always ready for new challenges!",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "what are your stacks?": {
    frames: [
      {
        text: "My arsenal is vast and powerful!",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Frontend: React, Next.js, Angular, TypeScript, Tailwind.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "Backend: NestJS, Node.js, Express, PostgreSQL, MongoDB, Supabase, Firebase.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "Mobile: Flutter, React Native, Expo.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Cloud & DevOps: AWS EC2, AWS S3, Azure, GCP, Docker, Elastic Beanstalk.",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "what can you do?": {
    frames: [
      {
        text: "I build responsive, scalable web applications that perform like a well-oiled siege engine.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I convert legacy code to modern architecture - like React Portal to Next.js 15.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "I create 3D experiences with Three.js and real-time dashboards with Socket.io.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "I do code reviews, mentor juniors, and collaborate in agile teams.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Basically... I build things that work beautifully. What do you need?",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "tell me about your experience": {
    frames: [
      {
        text: "I've walked many paths in this coding realm.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "At Highly Succeed, I converted React portals to Next.js 15 with TypeScript.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "At Zyllem, I upgraded Angular from v7 to v18 and saved costs with custom calendars.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "At Nuclear Brain, I upgraded Node.js, fixed email servers, and deployed to AWS.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "From junior to full-stack - I've grown with every project. Ready for more!",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "how did you adapt to ai?": {
    frames: [
      {
        text: "Ah, the great question of our time... Traditional vs AI.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "At first, I was caught between two worlds. Should I be worried?",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "Will AI replace developers? I felt overwhelmed by the rise of AI in programming.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "But then I realized... I don't have to fight it. I can embrace it!",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Now I'm a hybrid programmer! Traditional coding + AI assistance.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "I write code faster, debug smarter, and build better than ever before!",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "what do you think about ai replacing developers?": {
    frames: [
      {
        text: "Honestly? AI won't replace developers who know how to use it.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "The old way - pure manual coding. The new way - AI as your assistant.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I started testing, learning to prompt, to guide, to collaborate with AI.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "Now I'm 10x more productive. AI handles the boilerplate, I handle the architecture.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Best of both worlds! Traditional craftsmanship + AI efficiency.",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  "are you a traditional programmer or ai programmer?": {
    frames: [
      {
        text: "I'm both. I refuse to choose just one!",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "I respect the fundamentals - algorithms, data structures, clean code.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "But I also embrace AI - it's like having a thousand junior devs helping me.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Conflicting data? No. Complementary skills.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "I'm a hybrid programmer. The future is not human OR machine - it's human AND machine.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "That's my philosophy. Adapt, learn, grow together!",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
  default: {
    frames: [
      {
        text: "Hmm... I'm not sure I understand the question, traveler.",
        animationSet: "open-arms",
        endFrame: 8,
      },
      {
        text: "Ask me about who I am, my stacks, what I can do, or my experience.",
        animationSet: "raising-finger",
        endFrame: 8,
      },
      {
        text: "I'll share my wisdom from the coding realm!",
        animationSet: "open-arms",
        endFrame: 8,
      },
    ],
  },
};

// Helper function to get the correct frame path
export const getFramePath = (
  animationSet: AnimationSet,
  frameNumber: number,
): string => {
  const baseName =
    animationSet === "open-arms"
      ? "talking-open-arms"
      : "talking-raising-finger";
  return `/animated/${baseName}-${frameNumber}.png`;
};

// Function to loop through frames for current dialogue
export const getFramesForAnimation = (
  animationSet: AnimationSet,
  currentFrame: number,
): string => {
  // Loop from 1 to 8 and repeat
  const frameNumber = ((currentFrame - 1) % 8) + 1;
  return getFramePath(animationSet, frameNumber);
};
