import { NextResponse } from 'next/server';

export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  status?: string;
  color: 'lemon' | 'pink';
}

const projects: Project[] = [
  {
    id: 1,
    name: 'PASeguros',
    description: 'A comprehensive insurance platform offering various insurance products with an intuitive user interface and seamless experience.',
    url: 'https://paseguros.com.br',
    image: '/images/project-paseguros.png',
    color: 'lemon',
  },
  {
    id: 2,
    name: 'Bruna Cruz',
    description: 'A personal website for an English teacher, featuring course offerings, scheduling, and resources for students.',
    url: 'https://englishprof.brunabcruz.com.br',
    image: '/images/project-englishprof.png',
    color: 'pink',
  },
  {
    id: 3,
    name: 'KLS Eventos',
    description: 'An event management platform designed to streamline event planning, ticketing, and attendee engagement.',
    url: 'https://klseventos.com.br',
    image: '/images/project-kls.png',
    status: 'in development',
    color: 'lemon',
  },
  {
    id: 4,
    name: 'Plie Croche',
    description: 'A Landing page for promoting crochet products and workshops, showcasing designs and facilitating customer inquiries.',
    url: 'http://pliecroche.com/',
    image: '/images/project-pliecroche.png',
    color: 'pink',
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
