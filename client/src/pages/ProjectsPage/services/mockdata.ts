import type { IProject } from "../types";


export const MOCK_PROJECTS: Partial<IProject>[] = [
  {
    _id: "65a1bc23e4b01234567890ab",
    title: "Cosmic Strike Bowling Lounge",
    slug: "cosmic-strike-bowling-lounge",
    description: "A premium 12-lane cosmic bowling installation inside the Hyperion Mall, complete with interactive lane projection maps and custom scoring displays.",
    tags: ["bowling", "malls", "led-lighting", "interactive"],
    isPublished: true,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=600&auto=format&fit=crop",
        publicId: "projects/cosmic_strike_01"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
        publicId: "projects/cosmic_strike_02"
      }
    ],
    featurePoints: [
      { title: "Dynamic Projection Mapping", description: "Real-time interactive visuals matching the ball's rolling trajectory down the lane lanes." },
      { title: "Smart-Sync LED Integration", description: "Fully integrated sound-to-light LED setups built directly into the lane gutters and architectural masking panels." }
    ],
    bulletList: [
      {
        heading: "Equipment Installed",
        items: ["12 Multi-layer Synthetic Lanes", "String Pinsetters", "Touchscreen Scoring Consoles", "Premium Arcade Terminals"]
      }
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: "Sub-floor Concrete Layout",
        description: "Laser leveling the foundation structure to zero variance for tournament-standard ball travel.",
        points: ["Vibration pads anchored", "Level checking across 60-foot spans"]
      },
      {
        stepNumber: 2,
        title: "Lane Decking & Machinery Mounting",
        description: "Installing structural glow-in-the-dark lane overlays and high-speed string pinsetter arrays.",
      }
    ],
    testimonials: [
      {
        clientName: "Marcus Vance",
        designation: "Operations Director",
        companyName: "Hyperion Retail Ventures",
        message: "Bowling Planet turned an empty anchor store floor into our mall's highest-earning footprint. Exceptional layout planning and support.",
        rating: 5
      }
    ],
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-01-20T14:30:00.000Z"
  },
  {
    _id: "65a1bc23e4b01234567890ac",
    title: "Apex Family Entertainment Resort",
    slug: "apex-family-entertainment-resort",
    description: "A massive multi-attraction resort integration featuring boutique VIP bowling lanes, an indoor tactical laser tag arena, and a multi-level redemption arcade.",
    tags: ["bowling", "resorts", "laser-tag", "arcade"],
    isPublished: true,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=600&auto=format&fit=crop",
        publicId: "projects/apex_resort_01"
      }
    ],
    featurePoints: [
      { title: "Boutique VIP Suite Lanes", description: "Private 4-lane enclave with high-end luxury seating and dedicated catering support systems." }
    ],
    bulletList: [
      {
        heading: "Scope of Service",
        items: ["Concept Interior Design", "Hardware Procurement", "Staff Operations Onboarding", "Custom Point-of-Sale Integration"]
      }
    ],
    setupSteps: [],
    testimonials: [
      {
        clientName: "Elena Rostova",
        designation: "General Manager",
        companyName: "Apex Leisure Hotels",
        message: "The custom aesthetic blends perfectly with our luxury resort style. Guest retention metrics spiked 34% since the launch.",
        rating: 5
      }
    ],
    createdAt: "2026-02-10T08:15:00.000Z",
    updatedAt: "2026-02-11T09:00:00.000Z"
  },
  {
    _id: "65a1bc23e4b01234567890ad",
    title: "The Neon Pin Diner & Lanes",
    slug: "the-neon-pin-diner-and-lanes",
    description: "A retro-themed 1950s style luxury boutique diner built alongside a premium duckpin bowling experience for hotel attractions.",
    tags: ["duckpin", "hotels", "retro", "boutique"],
    isPublished: true,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1561571175-901768826500?q=80&w=600&auto=format&fit=crop",
        publicId: "projects/neon_pin_01"
      }
    ],
    featurePoints: [
      { title: "Space Optimization Duckpin Configuration", description: "Shortened lane profiles optimized to yield the maximal lane density for hospitality layouts." }
    ],
    bulletList: [],
    setupSteps: [],
    testimonials: [],
    createdAt: "2025-11-05T12:00:00.000Z",
    updatedAt: "2025-11-05T12:00:00.000Z"
  },
  {
    _id: "65a1bc23e4b01234567890ae",
    title: "Supernova Entertainment Hub & Bowling Planet flagship",
    slug: "supernova-entertainment-hub",
    description: "Our largest turn-key entertainment ecosystem to date. A massive 50,000 sq. ft. multi-attraction destination featuring 16 boutique bowling lanes, hyper-immersive projection mapping, custom arcade structures, and a premium hospitality lounge layout.",
    tags: ["bowling", "resorts", "malls", "interactive", "arcade", "vip-lounge", "laser-tag"],
    isPublished: true,

    // 10 Media Items (Mix of images and video)
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=800", publicId: "supernova_01" },
      { type: "image", url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800", publicId: "supernova_02" },
      { type: "image", url: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800", publicId: "supernova_03" },
      { type: "image", url: "https://images.unsplash.com/photo-1561571175-901768826500?q=80&w=800", publicId: "supernova_04" },
      { type: "image", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", publicId: "supernova_05" },
      { type: "image", url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800", publicId: "supernova_06" },
      { type: "image", url: "https://images.unsplash.com/photo-1580234810907-b40315b76418?q=80&w=800", publicId: "supernova_07" },
      { type: "image", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800", publicId: "supernova_08" },
      { type: "image", url: "https://images.unsplash.com/photo-1513829092301-02a8505a593e?q=80&w=800", publicId: "supernova_09" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", publicId: "supernova_video_10" }
    ],

    // More than 5 Core Feature Points
    featurePoints: [
      { title: "16 Professional-Grade Lanes", description: "Equipped with luxury synthetic lane decking and high-durability modern bumper assemblies." },
      { title: "Interactive Lane Projection Mapping", description: "Custom dynamic graphic layouts tracking bowling ball velocities and trajectories." },
      { title: "Next-Gen String Pinsetters", description: "Energy-efficient mechanical units driving down maintenance overhead by 65%." },
      { title: "Integrated Tactical Laser Arena", description: "A multi-level, neon-lit combat zone featuring advanced haptic vest networks." },
      { title: "Smart POS & Scoring Synchronization", description: "Centralized tournament tracking linked seamlessly to guest mobile profiles." },
      { title: "VIP Acoustic Sound Dampening", description: "Custom architectural panel setups containing lane acoustics away from the premium dining lounge." }
    ],

    // Many Bullet Points across multiple structural lists
    bulletList: [
      {
        heading: "Hardware & Infrastructure Installed",
        items: [
          "16 Lane synthetic deck structures with blacklight UV capability",
          "16 Ultra-responsive touchscreen scoring consoles",
          "Edge-to-edge interactive overhead laser tracking arrays",
          "120 Premium arcade terminals featuring ticket redemption hardware",
          "Enterprise-grade centralized lane control workstation hubs",
          "High-output ambient sound systems featuring multi-zone routing matrix"
        ]
      },
      {
        heading: "Operational Deliverables Provided",
        items: [
          "Architectural floorplan drafting & safety structural clearance check",
          "Full equipment procurement, ocean shipping logistics, and customs clearance",
          "On-site master installation managed by professional millwright field teams",
          "30-day technical operational training boot camp for backend facility crews",
          "Custom branded software splash pages matching local venue guidelines",
          "24/7 Remote system monitoring and cloud-backed diagnostic diagnostics"
        ]
      }
    ],

    // More than 5 Project Setup Timeline Steps
    // 6 Project Setup Timeline Steps with Images
    // 6 Project Setup Timeline Steps structured perfectly to match your ISetupStep interface
    setupSteps: [
      {
        stepNumber: 1,
        title: "Site Excavation & Foundation Engineering",
        description: "Laser-leveling concrete sub-structures to strict tolerances.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500",
          publicId: "steps/step_01_foundation"
        },
        points: ["Foundation reinforcement", "Vibration baseline audit"]
      },
      {
        stepNumber: 2,
        title: "Structural Steel Frame & Lane Foundation",
        description: "Assembling I-beam chassis structures supporting elevated approach plates.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=500",
          publicId: "steps/step_02_framing"
        },
        points: ["Approach plate alignment", "Gutter channel framing"]
      },
      {
        stepNumber: 3,
        title: "Pinsetter Mechanical Array Rigging",
        description: "Rigging and micro-calibrating automatic string-reset mechanical engines.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=500",
          publicId: "steps/step_03_machinery"
        },
        points: ["String line tension testing", "Power drop configurations"]
      },
      {
        stepNumber: 4,
        title: "Synthetic Lane Decking Laydown",
        description: "Meticulously locking seamless synthetic deck surfaces with glow-in-the-dark graphic elements.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500",
          publicId: "steps/step_04_decking"
        },
        points: ["UV layer scratch testing", "Joint friction verification"]
      },
      {
        stepNumber: 5,
        title: "Projection Map and Sensor Calibration",
        description: "Mounting structural short-throw projectors and tracking camera units above the lanes.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1551703599-6b3e8c7eefd0?q=80&w=500",
          publicId: "steps/step_05_sensors"
        },
        points: ["Ball impact masking", "Visual synchronization"]
      },
      {
        stepNumber: 6,
        title: "User Acceptance Testing & Grand Opening Run",
        description: "Stress testing machinery cycles continuously under peak load simulated conditions.",
        image: {
          type: "image",
          url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500",
          publicId: "steps/step_06_uat"
        },
        points: ["Simultaneous 16-lane cycling", "POS error testing"]
      }
    ],

    // 6 Testimonials (More than 5)
    testimonials: [
      {
        clientName: "David Sterling",
        designation: "Chief Executive Officer",
        companyName: "Galaxy Entertainment Group",
        message: "An absolute masterclass in commercial attraction deployment. The scale was massive, but the execution was completely flawless.",
        rating: 5
      },
      {
        clientName: "Sarah Jenkins",
        designation: "VP of Hospitality",
        companyName: "Meridian Leisure Resorts",
        message: "The VIP boutique lanes completely transformed our foot traffic. Our corporate venue bookings doubled within the first fiscal quarter.",
        rating: 5
      },
      {
        clientName: "Kenji Takahashi",
        designation: "Lead Project Architect",
        companyName: "OmniSpace Designs",
        message: "As an architect, I appreciate their precise engineering tolerances. They integrated complicated mechanics into our design effortlessly.",
        rating: 5
      },
      {
        clientName: "Amara Diallo",
        designation: "Operations Supervisor",
        companyName: "The Supernova Hub",
        message: "The string pinsetters are a dream to maintain compared to traditional machines. Technical downtime has dropped to almost zero.",
        rating: 5
      },
      {
        clientName: "Carlos Mendez",
        designation: "Director of Retail Partnerships",
        companyName: "Westfield Plaza Operations",
        message: "Bowling Planet delivered on time and under budget. The interactive lane projection is a huge magnet for teenage families.",
        rating: 4
      },
      {
        clientName: "Rachel Greenwell",
        designation: "Guest Experience Specialist",
        companyName: "Urban Playground Inc.",
        message: "Our customers love the social media-friendly aesthetics. The lighting tracks look stunning in video and photos.",
        rating: 5
      }
    ],
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-15T18:22:00.000Z"
  }
];
