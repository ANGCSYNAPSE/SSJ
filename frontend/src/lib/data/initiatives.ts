export interface Initiative {
  id: number;
  tag: string;
  title: string;
  desc: string;
  image: string;
}

/** "Our Initiatives" bento grid on the home page — order maps to the grid layout (2 large, 3 medium, 1 full-width). */
export const INITIATIVES: Initiative[] = [
  {
    id: 1,
    tag: "FOOD SEVA",
    title: "Annadan (Food Seva)",
    desc: "Ensuring no one sleeps hungry - one meal, one life at a time.",
    image: "/images/initiatives/card-01.png",
  },
  {
    id: 2,
    tag: "EDUCATION",
    title: "Education Support",
    desc: "Scholarships, mentorship, and resources - because every child deserves to dream.",
    image: "/images/initiatives/card-02.png",
  },
  {
    id: 3,
    tag: "SWACHH VAHINI",
    title: "Swachh Vahini",
    desc: "Promoting cleanliness, hygiene, and environmental care through community-driven initiatives.",
    image: "/images/initiatives/card-03.png",
  },
  {
    id: 4,
    tag: "GAUSHALA",
    title: "Gaushala",
    desc: "Providing shelter, nourishment, and medical care to abandoned and injured cows.",
    image: "/images/initiatives/card-04.png",
  },
  {
    id: 5,
    tag: "Marriage Bureau",
    title: "Marriage Bureau",
    desc: "Connecting hearts through a trusted, values-driven matrimonial platform built for the community.",
    image: "/images/initiatives/card-05.png",
  },
  {
    id: 6,
    tag: "CARE & SHELTER",
    title: "Old Age Home",
    desc: "A safe, dignified, and loving home for our elders - because they deserve nothing less.",
    image: "/images/initiatives/card-06.png",
  },
];
