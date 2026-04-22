import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface Monster {
    id: string;
    name: string;
    dialog: string;
    position: { x: number; z: number };
    model: string;
    scale: number;
    rotation?: number;
}

export const MONSTERS: Monster[] = [
    // Starting point monster
    {
        id: 'react_ricky',
        name: 'React Ricky',
        dialog: 'Greetings, traveler! I specialize in React and Next.js 16! The new Turbopack integration is insane - 10x faster builds! Did you know beyond those mountains there is a secret village? I heard they use Angular 18 there!',
        position: { x: -100, z: 32 },
        model: 'Dragon.glb',
        scale: 0.8,
    },
    // Village 1 - Town Center
    {
        id: 'angular_annie',
        name: 'Angular Annie',
        dialog: 'Hey there! Angular 18 just dropped with standalone components everywhere! I upgraded projects from v7 to v18. PS: Did you know there\'s a hidden port to the west? The ships there carry rare artifacts!',
        position: { x: 2, z: 2 },
        model: 'Wizard.glb',
        scale: 0.7,
    },
    // Village 1 - Near Blacksmith
    {
        id: 'nestjs_nelson',
        name: 'NestJS Nelson',
        dialog: 'Backend APIs are my specialty! NestJS 10 with GraphQL federation is a game changer. Hey, have you explored the eastern mountains? There\'s an abandoned fortress with ancient tech secrets!',
        position: { x: -4, z: 8 },
        model: 'Orc.glb',
        scale: 0.8,
    },
    // Village 1 - Near Houses
    {
        id: 'flutter_fiona',
        name: 'Flutter Fiona',
        dialog: 'Flutter 3.22 just released with Impeller rendering! Cross-platform never looked better. Tip: Check out the northern forest - there\'s a hidden waterfall with a mysterious cave behind it!',
        position: { x: -8, z: -4 },
        model: 'Frog.glb',
        scale: 0.6,
    },
    // Village 1 - Near Sawmill
    {
        id: 'typescript_tom',
        name: 'TypeScript Tom',
        dialog: 'TypeScript 5.5 brings even better type inference! No more "any" types in my codebase. Have you visited the southern mines? Rumor has it there\'s a secret underground city beneath them!',
        position: { x: -9, z: -5 },
        model: 'Ghost.glb',
        scale: 0.7,
    },
    // Village 1 - Near Temple
    {
        id: 'express_edward',
        name: 'Express Edward',
        dialog: 'Express 5 is finally stable! Better error handling and promise support. Did you know beyond the western hills lies a mysterious temple? Locals say it holds the source code of the ancients!',
        position: { x: -7, z: 15 },
        model: 'Demon.glb',
        scale: 0.8,
    },
    // Village 1 - Near Farms
    {
        id: 'aws_amelia',
        name: 'AWS Amelia',
        dialog: 'AWS Lambda now supports Node.js 22! Serverless is getting faster every day. Hey, I heard there\'s a hidden village to the far east. The journey is long but the architecture is breathtaking!',
        position: { x: 10, z: -10 },
        model: 'Dino.glb',
        scale: 0.7,
    },
    // Village 1 - Near Port
    {
        id: 'unlayer_uma',
        name: 'Unlayer Uma',
        dialog: 'Email builders have evolved! Drag-and-drop editors with AI suggestions. Have you been to the port at night? The bioluminescent algae make the water glow - it\'s magical!',
        position: { x: -18, z: 18 },
        model: 'Fish.glb',
        scale: 0.6,
    },
    // Village 1 - Near Barracks
    {
        id: 'socket_sam',
        name: 'Socket Sam',
        dialog: 'Socket.io v4 with Redis adapter can handle millions of connections! Pro tip: There\'s a watchtower to the north that gives the best view of the entire valley. You can see both villages from up there!',
        position: { x: -15, z: 10 },
        model: 'Yeti.glb',
        scale: 0.8,
    },
    // Village 1 - Near Windmill
    {
        id: 'agile_alex',
        name: 'Agile Alex',
        dialog: 'Scrum, Kanban, SAFe - agile methodologies keep evolving! Did you know there\'s a windmill on the eastern hill that powers a secret underground laboratory? Scientists are working on something big!',
        position: { x: 17, z: -12 },
        model: 'Ninja.glb',
        scale: 0.7,
    },
    // Village 2 - Center
    {
        id: 'fullstack_frank',
        name: 'Full-Stack Frank',
        dialog: 'The line between frontend and backend is blurring! Next.js 16 blurs it even more with server components. Welcome to Village 2! Have you noticed the ancient stone circle nearby? Some say it\'s a portal to another dimension!',
        position: { x: 80, z: 60 },
        model: 'Dragon Evolved.glb',
        scale: 0.7,
    },
    // Village 2 - Near Blacksmith area
    {
        id: 'ui_ursula',
        name: 'UI Ursula',
        dialog: 'UI/UX is all about micro-interactions now! Tailwind CSS v4 just dropped with even better JIT compiler. Explore the hills behind this village - there\'s a hidden hot spring with healing properties!',
        position: { x: 73, z: 70 },
        model: 'Cat.glb',
        scale: 0.6,
    },
    // Village 2 - Near Mill
    {
        id: 'performance_pete',
        name: 'Performance Pete',
        dialog: 'Core Web Vitals are crucial! Did you know Lighthouse now scores up to 1000? Adventure tip: Follow the river east - it leads to a massive waterfall with a treasure chest behind it!',
        position: { x: 94, z: 61 },
        model: 'Chicken.glb',
        scale: 0.6,
    },
    // Village 2 - Near Bell Tower
    {
        id: 'reusable_rita',
        name: 'Reusable Rita',
        dialog: 'Component-driven development is the future! Storybook 8 makes documentation beautiful. Ring the bell tower sometime - locals say it reveals hidden paths in the forest!',
        position: { x: 85, z: 50 },
        model: 'Bunny.glb',
        scale: 0.5,
    },
    // Village 2 - Near Sawmill
    {
        id: 'maintenance_marco',
        name: 'Maintenance Marco',
        dialog: 'Legacy code modernization is an art! Did you know there\'s an ancient sawmill in the dark forest? It runs by itself - some say it\'s powered by magic (or maybe just good engineering)!',
        position: { x: 68, z: 58 },
        model: 'Alien.glb',
        scale: 0.7,
    },
    // Village 2 - Near Gazebo
    {
        id: 'real_time_ray',
        name: 'Real-Time Ray',
        dialog: 'WebSockets, WebRTC, SSE - real-time is everywhere! Fun fact: There\'s a gazebo in the center of Village 2 that plays music at sunset. Go check it out around 6 PM!',
        position: { x: 71, z: 73 },
        model: 'Squidle.glb',
        scale: 0.6,
    },
    // Between villages on the path
    {
        id: 'git_greg',
        name: 'Git Greg',
        dialog: 'Git worktrees changed my workflow! No more switching branches constantly. On your journey between villages, look for the ancient bridge - trolls live under it, but they\'re friendly if you know Git!',
        position: { x: 40, z: 30 },
        model: 'Orc Enemy.glb',
        scale: 0.7,
    },
    // Near the mines
    {
        id: 'data_visualizer_dave',
        name: 'Data Viz Dave',
        dialog: 'D3.js v8 makes charts sing! Did you know the mines to the north contain crystals that glow in the dark? Miners say they pulse to the rhythm of the earth\'s heartbeat!',
        position: { x: -20, z: -3 },
        model: 'Pink Blob.glb',
        scale: 0.5,
    },
    // Near the archery area
    {
        id: 'troubleshooter_tina',
        name: 'Troubleshooter Tina',
        dialog: 'Debugging is a superpower! The browser devtools have AI-powered suggestions now. Challenge: Hit 10 targets at the archery range - rumor has it the champion gets a legendary bow!',
        position: { x: 20, z: 10 },
        model: 'Blue Demon.glb',
        scale: 0.7,
    },
];