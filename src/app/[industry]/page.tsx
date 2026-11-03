import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { getDemos } from "@/lib/demos";

export const revalidate = 60;
// Industries added later in the portal still get a page.
export const dynamicParams = true;

type Props = { params: Promise<{ industry: string }> };

export async function generateStaticParams() {
  return (await getDemos()).industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const i = (await getDemos()).industries.find((x) => x.slug === industry);
  return i ? { title: `${i.name} websites`, description: `Live ${i.name.toLowerCase()} websites built by Zoxen Digital.` } : {};
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const data = await getDemos();
  const current = data.industries.find((i) => i.slug === industry);
  if (!current) notFound();
  return <Gallery data={data} current={current} />;
}
