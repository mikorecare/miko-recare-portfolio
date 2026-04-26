export const storyDialogs = [
  {
    chapter: 1,
    name: "Volli's Apprentice",
    dialog: "If you read my Codex on the home page, you already know the quiet truth: I didn't start as a genius. My first job? Junior Developer at Volli Bellingham. I knew nothing about Angular. Nothing about Flutter. But I knew how to program. So I locked myself in a room for two weeks, emerging with a working mobile app and a chat feature built from scratch. That was the first time I realized: mastery isn't knowing everything—it's the courage to figure it out alone.",
    title: "My First Quest",
    experience: "Volli Bellingham",
  },
  {
    chapter: 2,
    name: "The Arsenal Keeper",
    dialog: "Hark, traveler! Do you see the floating sigils behind me? These are the sacred tools of my craft - my Frontend Arsenal! ⚔️\n\nReact, the shield that reflects all attacks! Next.js, the torch that lights the darkest paths! TypeScript, the armor that prevents fatal wounds! Tailwind, the swift steed that carries designs to victory!\n\nEach one I've mastered through countless battles. Each one a weapon forged in the fires of real-world wars. Without them, I'd be a knight without a sword - defenseless against the chaos of broken UIs and inconsistent designs.\n\nI didn't learn these overnight. I bled. I broke things. I rebuilt them stronger. Now they serve me like loyal squires.\n\nWhat good is a warrior without his arsenal? What good is a developer without his stacks? These are not just tools, young adventurer - they are extensions of my very will.\n\nWould you like to witness their power? Walk closer, and I shall reveal the secrets of each sacred sigil!",
    title: "The Sacred Arsenal",
    experience: "Master of Stacks",
  },
  {
    chapter: 3,
    name: "The Evolved Sage",
    dialog: "You've met my younger self, the Dragon. Now witness what years of battle have forged - the Dragon Evolved! 🐉⚡\n\nLet me share a truth that took me years to understand: React, Angular, Vue, Svelte... they are but different dialects of the same ancient language. The syntax changes, the patterns shift, but the eternal principles remain:\n\n🛡️ SECURITY - The castle walls that keep invaders at bay. Without this, your kingdom falls.\n📈 SCALABILITY - The ability to grow from a village to an empire without crumbling.\n🔧 MAINTAINABILITY - The wisdom to write code that future generations can read and heal.\n\nI chased frameworks like a fool chasing wind. 'Learn this! No, learn that!' But one day, I stopped. I looked beyond the syntax. And I saw the truth.\n\nA sword is just steel. A spell is just words. What matters is the hand that wields it and the principles that guide it.\n\nWhether you write Angular or React, TypeScript or JavaScript - ask not 'What framework?' Ask 'Is it secure? Can it grow? Will my future self thank me?'\n\nThat, young warrior, is the true evolution. Not knowing more frameworks. But understanding the timeless laws that govern them all.",
    title: "The Great Realization",
    experience: "The Evolution",
  },
  {
    chapter: 4,
    name: "The First Nuclear Trial",
    dialog: "My journey took me to Nuclear Brain for the first time. I was young, eager, and hungry to prove myself. They handed me an email server held together by prayers and duct tape. 'Fix it,' they said. 'Make it real-time,' they said.\n\nI stared into the abyss of Node.js, Express, and MongoDB. The abyss stared back. But I didn't retreat. I learned WebSockets. I wrestled with Socket.io until it bent to my will. I deployed to AWS EC2 and S3 like a general commanding an army.\n\nWhen that email server finally came alive - sending real-time progress updates, handling thousands of recipients - I felt something shift inside me. I was no longer 'just the frontend guy.' I was becoming something more. A bridge between worlds. A FULL-STACK WARRIOR.\n\nThis was my crucible. Where I learned that the frontend and backend are not enemies - they are TWO HALVES OF THE SAME SWORD!",
    title: "The Full-Stack Awakening",
    experience: "Nuclear Brain (First Stint)",
  },
  {
    chapter: 5,
    name: "Zyllem Sage",
    dialog: "Then came Zyllem. Angular v7. Old. Clunky. Expensive third-party calendars. They asked if I could upgrade. I said yes before I knew how. Weeks later, v18 was live. Custom calendar components replaced paid tools. Saved the company thousands. But the real lesson? Legacy code isn't a burden. It's a teacher dressed in outdated clothes. You just have to be brave enough to refactor the past.",
    title: "The Angular Evolution",
    experience: "Zyllem",
  },
  {
    chapter: 6,
    name: "The Second Nuclear Trial",
    dialog: "I returned to Nuclear Brain like a prodigal son - but this time, I carried new weapons. NestJS, the structured fortress. TypeScript, the unbreakable vow. PostgreSQL, the library of eternal records.\n\nThey asked me to rebuild the backend from its ancient bones. PHP and Laravel fell away. In their place rose a modern kingdom of NestJS modules, dependency injection, and clean architecture.\n\nI learned that rewriting isn't about erasing the past - it's about HONORING WHAT CAME BEFORE while building something stronger. The old code taught me what NOT to do. The new code showed me what WAS POSSIBLE.\n\nSame company. Same mission. But I was not the same developer. I had evolved. And so had the systems I built.",
    title: "The Phoenix Resurrection",
    experience: "Nuclear Brain (Second Stint)",
  },
  {
    chapter: 7,
    name: "Highly Succeed Commander",
    dialog: "Now at Highly Succeed Inc., the game changed again. Enterprise applications. Young developers looking at me like I once looked at seniors. Mentoring them, I realized something painful and beautiful: I had become the person I once needed. Leading major projects now. Not because I'm the smartest, but because I've failed enough times to know what works. The journey from junior to leader isn't a ladder. It's a spiral—you keep revisiting old lessons, each time deeper.",
    title: "Enterprise Level",
    experience: "Highly Succeed Inc.",
  },
  {
    chapter: 8,
    name: "The Oracle",
    dialog: "From a junior who didn't know Angular to a full-stack developer leading enterprise systems. Two stints at Nuclear Brain. One transformation. The truth that no resume captures: every single day, I still don't know enough. And that's okay. Because I no longer chase 'knowing everything.' I chase the fire of figuring things out. The first sign wasn't talent. It was stubborn curiosity. And that fire? It's still burning. This is just the beginning.",
    title: "The Journey Continues",
    experience: "The Future",
  },
];

// Monster positions along the path
export const MONSTER_POSITIONS = [
  { x: -8, z: -80, direction: "left", chapter: 1, monsterType: "dino" },
  { x: -8, z: -65, direction: "left", chapter: 2, monsterType: "dragon" },
  { x: -8, z: -50, direction: "left", chapter: 3, monsterType: "dragon-evolved" },
  { x: 8, z: -35, direction: "right", chapter: 4, monsterType: "orc" },
  { x: -8, z: -15, direction: "left", chapter: 5, monsterType: "wizard" },
  { x: 8, z: 10, direction: "right", chapter: 6, monsterType: "demon" },
  { x: -8, z: 35, direction: "left", chapter: 7, monsterType: "yeti" },
  { x: 8, z: 60, direction: "right", chapter: 8, monsterType: "alien" },
  { x: -8, z: 85, direction: "left", chapter: 9, monsterType: "birb" },
];

// Map monster types to their models
export const getMonsterModel = (
  type: string,
): { path: string; scale: number; movement: "idle" | "patrol" | "fly" } => {
  switch (type) {
    case "dino":
      return { path: "/monsters/Dino.glb", scale: 1.5, movement: "idle" };
    case "dragon":
      return { path: "/monsters/Dragon.glb", scale: 1.5, movement: "idle" };
    case "dragon-evolved":
      return {
        path: "/monsters/Dragon Evolved.glb",
        scale: 1.5,
        movement: "idle",
      };
    case "orc":
      return { path: "/monsters/Orc.glb", scale: 1.2, movement: "idle" };
    case "wizard":
      return { path: "/monsters/Wizard.glb", scale: 1.3, movement: "idle" };
    case "demon":
      return { path: "/monsters/Demon.glb", scale: 1.4, movement: "idle" };
    case "yeti":
      return { path: "/monsters/Yeti.glb", scale: 1.5, movement: "idle" };
    case "alien":
      return { path: "/monsters/Alien.glb", scale: 1.2, movement: "idle" };
    case "birb":
      return { path: "/monsters/Birb.glb", scale: 0.8, movement: "idle" };
    default:
      return { path: "/monsters/Orc.glb", scale: 1.2, movement: "idle" };
  }
};