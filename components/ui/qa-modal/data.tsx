export const qaDatabase: Record<
  string,
  { frames: { text: string; emotion: string; endFrame: number }[] }
> = {
  "who am I": {
    frames: [
      {
        text: "Ah, curious about the developer behind this medieval realm?",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I am Miko Recare, a full-stack developer from General Trias, Philippines.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I specialize in React, Angular, NestJS, and Flutter.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I turn wireframes into legendary digital experiences with the precision of a master blacksmith.",
        emotion: "doing-thing",
        endFrame: 10,
      },
      {
        text: "Bachelor's in IT from Cavite State University. Always ready for new challenges!",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
  "what are your stacks": {
    frames: [
      {
        text: "My arsenal is vast and powerful!",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "Frontend: React, Next.js, Angular, TypeScript, Tailwind.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "Backend: NestJS, Node.js, Express, PostgreSQL, MongoDB, Supabase, Firebase.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "Mobile: Flutter, React Native, Expo.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "Cloud & DevOps: AWS EC2, AWS S3, Azure, GCP, Docker, Elastic Beanstalk.",
        emotion: "acceptance",
        endFrame: 15,
      },
    ],
  },
  "what can you do": {
    frames: [
      {
        text: "I build responsive, scalable web applications that perform like a well-oiled siege engine.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I convert legacy code to modern architecture - like React Portal to Next.js 15.",
        emotion: "doing-thing",
        endFrame: 10,
      },
      {
        text: "I create 3D experiences with Three.js and real-time dashboards with Socket.io.",
        emotion: "analyzing",
        endFrame: 12,
      },
      {
        text: "I do code reviews, mentor juniors, and collaborate in agile teams.",
        emotion: "showing-solution",
        endFrame: 14,
      },
      {
        text: "Basically... I build things that work beautifully. What do you need?",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
  "tell me about your experience": {
    frames: [
      {
        text: "I've walked many paths in this coding realm.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "At Highly Succeed, I converted React portals to Next.js 15 with TypeScript.",
        emotion: "doing-thing",
        endFrame: 10,
      },
      {
        text: "At Zyllem, I upgraded Angular from v7 to v18 and saved costs with custom calendars.",
        emotion: "analyzing",
        endFrame: 12,
      },
      {
        text: "At Nuclear Brain, I upgraded Node.js, fixed email servers, and deployed to AWS.",
        emotion: "showing-solution",
        endFrame: 14,
      },
      {
        text: "From junior to full-stack - I've grown with every project. Ready for more!",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
  "how did you adapt to AI": {
    frames: [
      {
        text: "Ah, the great question of our time... Traditional vs AI.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "At first, I was caught between two worlds. Should I be worried?",
        emotion: "thinking-sigh",
        endFrame: 8,
      },
      {
        text: "Will AI replace developers? I felt overwhelmed by the rise of AI in programming.",
        emotion: "thinking-deep",
        endFrame: 11,
      },
      {
        text: "But then I realized... I don't have to fight it. I can embrace it!",
        emotion: "realization",
        endFrame: 13,
      },
      {
        text: "Now I'm a hybrid programmer! Traditional coding + AI assistance.",
        emotion: "happy",
        endFrame: 16,
      },
      {
        text: "I write code faster, debug smarter, and build better than ever before!",
        emotion: "acceptance",
        endFrame: 15,
      },
    ],
  },
  "what do you think about AI replacing developers": {
    frames: [
      {
        text: "Honestly? AI won't replace developers who know how to use it.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "The old way - pure manual coding. The new way - AI as your assistant.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I started testing, learning to prompt, to guide, to collaborate with AI.",
        emotion: "doing-thing",
        endFrame: 10,
      },
      {
        text: "Now I'm 10x more productive. AI handles the boilerplate, I handle the architecture.",
        emotion: "showing-solution",
        endFrame: 14,
      },
      {
        text: "Best of both worlds! Traditional craftsmanship + AI efficiency.",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
  "are you a traditional programmer or AI programmer": {
    frames: [
      {
        text: "I'm both. I refuse to choose just one!",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I respect the fundamentals - algorithms, data structures, clean code.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "But I also embrace AI - it's like having a thousand junior devs helping me.",
        emotion: "doing-thing",
        endFrame: 10,
      },
      {
        text: "Conflicting data? No. Complementary skills.",
        emotion: "analyzing",
        endFrame: 12,
      },
      {
        text: "I'm a hybrid programmer. The future is not human OR machine - it's human AND machine.",
        emotion: "acceptance",
        endFrame: 15,
      },
      {
        text: "That's my philosophy. Adapt, learn, grow together!",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
  default: {
    frames: [
      {
        text: "Hmm... I'm not sure I understand the question, traveler.",
        emotion: "thinking-sigh",
        endFrame: 8,
      },
      {
        text: "Ask me about who I am, my stacks, what I can do, or my experience.",
        emotion: "thinking",
        endFrame: 5,
      },
      {
        text: "I'll share my wisdom from the coding realm!",
        emotion: "happy",
        endFrame: 16,
      },
    ],
  },
};

export const emotionFrames: Record<string, number[]> = {
  thinking: [1, 2, 3, 4, 5, 6, 7, 9],
  "thinking-sigh": [8],
  "doing-thing": [10],
  "thinking-deep": [11],
  analyzing: [12],
  realization: [13],
  "showing-solution": [14],
  acceptance: [15],
  happy: [16],
};
