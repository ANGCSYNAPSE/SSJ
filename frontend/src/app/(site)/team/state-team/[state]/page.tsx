import { notFound } from "next/navigation";
import { STATE_CHAPTERS, getStateDetail } from "@/lib/stateTeams";
import StateDetailClient from "./StateDetailClient";

export function generateStaticParams() {
  return STATE_CHAPTERS.map((state) => ({ state: state.slug }));
}

export default function StateDetailPage({ params }: { params: { state: string } }) {
  const detail = getStateDetail(params.state);
  if (!detail) notFound();

  return <StateDetailClient detail={detail} />;
}
