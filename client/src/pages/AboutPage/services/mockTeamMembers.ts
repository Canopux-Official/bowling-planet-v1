// TEMPORARY: Replace with real API integration later.
/**
 * Team member types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with team API to avoid an extra types folder.
 */

export interface IMedia {
  type: 'image' | 'video'
  url: string
  publicId?: string
}

export type TeamMemberStatus = 'active' | 'inactive'

export interface ITeamMember {
  _id: string
  name: string
  designation: string
  experience?: string
  image: IMedia
  order: number
  status: TeamMemberStatus
  createdAt: string
  updatedAt: string
}

export const mockTeamMembers: ITeamMember[] = [
  {
    _id: 'tm-1',
    name: 'Rajesh Mehta',
    designation: 'Founder & Managing Director',
    experience: '17+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=12' },
    order: 0,
    status: 'active',
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-2',
    name: 'Priya Sharma',
    designation: 'Chief Executive Officer',
    experience: '15+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=5' },
    order: 1,
    status: 'active',
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-3',
    name: 'Amit Kapoor',
    designation: 'Head of Operations',
    experience: '12+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=33' },
    order: 2,
    status: 'active',
    createdAt: '2026-01-02T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-4',
    name: 'Sneha Iyer',
    designation: 'Strategy & Consulting Lead',
    experience: '10+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=9' },
    order: 3,
    status: 'active',
    createdAt: '2026-01-03T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-5',
    name: 'Vikram Desai',
    designation: 'Technical Director',
    experience: '11+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=15' },
    order: 4,
    status: 'active',
    createdAt: '2026-01-04T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-6',
    name: 'Ananya Bose',
    designation: 'Sales & Partnerships Head',
    experience: '9+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=20' },
    order: 5,
    status: 'active',
    createdAt: '2026-01-05T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-7',
    name: 'Karthik Nair',
    designation: 'Projects Lead',
    // Intentionally omitted experience to test the optional-field guard.
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=52' },
    order: 6,
    status: 'active',
    createdAt: '2026-01-06T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-8',
    name: 'Meera Patel',
    designation: 'Marketing Manager',
    experience: '7+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=25' },
    order: 7,
    status: 'active',
    createdAt: '2026-01-07T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-9',
    name: 'Rohit Singh',
    designation: 'HR & Culture Lead',
    experience: '8+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=60' },
    order: 8,
    status: 'active',
    createdAt: '2026-01-08T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'tm-10',
    name: 'Deepak Verma',
    designation: 'Former Regional Advisor',
    experience: '14+ Years',
    image: { type: 'image', url: 'https://i.pravatar.cc/150?img=68' },
    order: 9,
    status: 'inactive',
    createdAt: '2026-01-09T10:00:00.000Z',
    updatedAt: '2026-03-01T10:00:00.000Z',
  },
]
