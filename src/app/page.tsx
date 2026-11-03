import { Gallery } from "@/components/Gallery";
import { getDemos } from "@/lib/demos";

export const revalidate = 60;

export default async function Home() {
  return <Gallery data={await getDemos()} />;
}
