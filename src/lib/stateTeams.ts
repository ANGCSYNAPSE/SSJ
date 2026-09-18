export type StateChapter = {
  name: string;
  slug: string;
  members: number;
};

export const STATE_CHAPTERS: StateChapter[] = [
  { name: "Haryana", slug: "haryana", members: 48 },
  { name: "Punjab", slug: "punjab", members: 24 },
  { name: "Rajasthan", slug: "rajasthan", members: 76 },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", members: 62 },
  { name: "Delhi", slug: "delhi", members: 38 },
  { name: "Maharashtra", slug: "maharashtra", members: 32 },
  // North Indian states
  { name: "Himachal Pradesh", slug: "himachal-pradesh", members: 19 },
  { name: "Uttarakhand", slug: "uttarakhand", members: 22 },
  { name: "Jammu & Kashmir", slug: "jammu-and-kashmir", members: 14 },
  { name: "Chandigarh", slug: "chandigarh", members: 11 },
  { name: "Bihar", slug: "bihar", members: 29 },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", members: 27 },
];

export function getStateChapter(slug: string) {
  return STATE_CHAPTERS.find((s) => s.slug === slug);
}

export type Person = {
  image: string;
  name: string;
  role: string;
  unit: string;
  location: string;
  desc: string;
};

export type DistrictTeam = {
  title: string;
  members: Person[];
};

export type StateDetail = {
  name: string;
  slug: string;
  stats: { totalMembers: string; districtsCovered: string; established: string };
  leadership: Person[];
  districtTeams: DistrictTeam[];
};

const HARYANA_DETAIL: StateDetail = {
  name: "Haryana",
  slug: "haryana",
  stats: { totalMembers: "48 Active", districtsCovered: "12 Districts", established: "April 2021" },
  leadership: [
    {
      image: "/images/team/state/haryana/jagmohan-mittal.png",
      name: "Shri Jagmohan Mittal",
      role: "State President — Haryana",
      unit: "State Executive",
      location: "Gurugram",
      desc: "Directing district heads, organizing massive state bhajan events, matrimonial meets, and managing local temple listings.",
    },
    {
      image: "/images/team/state/haryana/sarla-goyal.png",
      name: "Smt. Sarla Goyal Ji",
      role: "State Coordinator — Haryana",
      unit: "State Executive",
      location: "Rohtak",
      desc: "Directing district heads, organizing massive state bhajan events, matrimonial meets, and managing local temple listings.",
    },
  ],
  districtTeams: [
    {
      title: "Gurugram District Team",
      members: [
        {
          image: "/images/team/state/haryana/devender-singhal.png",
          name: "Shri Devender Singhal",
          role: "District President",
          unit: "Gurugram Unit",
          location: "Gurugram",
          desc: "Managing technology support, pilgrim registers, and emergency support services in Gurugram.",
        },
        {
          image: "/images/team/state/haryana/rahul-bhardwaj.png",
          name: "Shri Rahul Bhardwaj",
          role: "District Coordinator",
          unit: "Gurugram Unit",
          location: "Gurugram",
          desc: "Managing technology support, pilgrim registers, and emergency support services in Gurugram.",
        },
        {
          image: "/images/team/state/haryana/pooja-jindal.png",
          name: "Smt. Pooja Jindal",
          role: "District Executive Member",
          unit: "Gurugram Unit",
          location: "Gurugram",
          desc: "Managing technology support, pilgrim registers, and emergency support services in Gurugram.",
        },
      ],
    },
    {
      title: "Faridabad District Team",
      members: [
        {
          image: "/images/team/state/haryana/rameshwar-das.png",
          name: "Shri Rameshwar Das",
          role: "District President",
          unit: "Faridabad Unit",
          location: "Faridabad",
          desc: "Organizing monthly public spiritual meets, food kitchens, and coordinating regional matry registry.",
        },
        {
          image: "/images/team/state/haryana/anand-kedia.png",
          name: "Shri Anand Kedia",
          role: "District Coordinator",
          unit: "Faridabad Unit",
          location: "Faridabad",
          desc: "Organizing monthly public spiritual meets, food kitchens, and coordinating regional matry registry.",
        },
        {
          image: "/images/team/state/haryana/sunita-goyal.png",
          name: "Smt. Sunita Goyal",
          role: "District Executive Member",
          unit: "Faridabad Unit",
          location: "Faridabad",
          desc: "Organizing monthly public spiritual meets, food kitchens, and coordinating regional matry registry.",
        },
      ],
    },
    {
      title: "Rohtak District Team",
      members: [
        {
          image: "/images/team/state/haryana/satish-chahal.png",
          name: "Shri Satish Chahal",
          role: "District President",
          unit: "Rohtak Unit",
          location: "Rohtak",
          desc: "Leading school outreach, youth spiritual clubs, and managing verified local temple listings.",
        },
        {
          image: "/images/team/state/haryana/vijay-hooda.png",
          name: "Shri Vijay Hooda",
          role: "District Coordinator",
          unit: "Rohtak Unit",
          location: "Rohtak",
          desc: "Leading school outreach, youth spiritual clubs, and managing verified local temple listings.",
        },
        {
          image: "/images/team/state/haryana/kuldeep-sangwan.png",
          name: "Shri Kuldeep Sangwan",
          role: "District Executive Member",
          unit: "Rohtak Unit",
          location: "Rohtak",
          desc: "Leading school outreach, youth spiritual clubs, and managing verified local temple listings.",
        },
      ],
    },
  ],
};

const CITY_BY_STATE: Record<string, string> = {
  punjab: "Ludhiana",
  rajasthan: "Jaipur",
  "uttar-pradesh": "Lucknow",
  delhi: "New Delhi",
  maharashtra: "Mumbai",
  "himachal-pradesh": "Shimla",
  uttarakhand: "Dehradun",
  "jammu-and-kashmir": "Srinagar",
  chandigarh: "Chandigarh",
  bihar: "Patna",
  "madhya-pradesh": "Bhopal",
};

const MALE_NAMES = [
  "Ramesh Chandra",
  "Suresh Kumar",
  "Anil Verma",
  "Vikram Singh",
  "Manoj Tiwari",
  "Deepak Sharma",
  "Ashok Yadav",
  "Rajesh Gupta",
  "Sanjay Mehta",
  "Naresh Pandey",
  "Vinod Joshi",
];

const FEMALE_NAMES = [
  "Kavita Sharma",
  "Anita Verma",
  "Rekha Singh",
  "Meena Gupta",
  "Sunita Rawat",
  "Pooja Mishra",
  "Neelam Chauhan",
  "Geeta Devi",
  "Priya Nair",
  "Shalini Kapoor",
];

function pick(list: string[], seed: number) {
  return list[seed % list.length];
}

function buildGenericDetail(chapter: StateChapter, seed: number): StateDetail {
  const city = CITY_BY_STATE[chapter.slug] ?? chapter.name;
  const districtsCovered = Math.max(3, Math.round(chapter.members / 4));
  const established = 2018 + (seed % 6);

  const presidentName = `Shri ${pick(MALE_NAMES, seed)}`;
  const coordinatorName = `Smt. ${pick(FEMALE_NAMES, seed + 1)}`;
  const districtPresidentName = `Shri ${pick(MALE_NAMES, seed + 2)}`;
  const districtCoordinatorName = `Shri ${pick(MALE_NAMES, seed + 3)}`;
  const districtMemberName = `Smt. ${pick(FEMALE_NAMES, seed + 4)}`;

  return {
    name: chapter.name,
    slug: chapter.slug,
    stats: {
      totalMembers: `${chapter.members} Active`,
      districtsCovered: `${districtsCovered} Districts`,
      established: `${established}`,
    },
    leadership: [
      {
        image: "/images/team/state/generic-leader-1.png",
        name: presidentName,
        role: `State President — ${chapter.name}`,
        unit: "State Executive",
        location: city,
        desc: "Directing district heads, organizing state bhajan events, matrimonial meets, and managing local temple listings.",
      },
      {
        image: "/images/team/state/generic-leader-2.png",
        name: coordinatorName,
        role: `State Coordinator — ${chapter.name}`,
        unit: "State Executive",
        location: city,
        desc: "Coordinating darshan schedules, pilgrim welfare drives, and regional seva volunteer networks.",
      },
    ],
    districtTeams: [
      {
        title: `${city} District Team`,
        members: [
          {
            image: "/images/team/state/generic-district-1.png",
            name: districtPresidentName,
            role: "District President",
            unit: `${city} Unit`,
            location: city,
            desc: `Managing technology support, pilgrim registers, and emergency support services in ${city}.`,
          },
          {
            image: "/images/team/state/generic-district-2.png",
            name: districtCoordinatorName,
            role: "District Coordinator",
            unit: `${city} Unit`,
            location: city,
            desc: `Organizing monthly public spiritual meets, food kitchens, and coordinating the regional registry in ${city}.`,
          },
          {
            image: "/images/team/state/generic-district-3.png",
            name: districtMemberName,
            role: "District Executive Member",
            unit: `${city} Unit`,
            location: city,
            desc: `Leading school outreach, youth spiritual clubs, and managing verified local temple listings in ${city}.`,
          },
        ],
      },
    ],
  };
}

export function getStateDetail(slug: string): StateDetail | undefined {
  if (slug === "haryana") return HARYANA_DETAIL;
  const idx = STATE_CHAPTERS.findIndex((s) => s.slug === slug);
  if (idx === -1) return undefined;
  return buildGenericDetail(STATE_CHAPTERS[idx], idx);
}
