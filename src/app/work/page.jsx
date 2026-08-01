import WorkGrid from "@/components/work/WorkGrid";

const DESCRIPTION =
  "Case studies in brand identity, web design, and growth marketing for clients across finance, healthcare, and consumer brands.";

export const metadata = {
  title: "Work",
  description: DESCRIPTION,
  openGraph: {
    title: "Work | SPKRHED",
    description: DESCRIPTION,
  },
};

export default function WorkPage() {
  return <WorkGrid />;
}