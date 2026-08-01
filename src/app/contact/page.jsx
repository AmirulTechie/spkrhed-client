import ContactHero from "@/components/contact/ContactHero";

const DESCRIPTION =
  "Start the conversation. Get in touch with SPKRHED to talk through what growing your pipeline on LinkedIn could look like.";

export const metadata = {
  title: "Contact",
  description: DESCRIPTION,
  openGraph: {
    title: "Contact | SPKRHED",
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
    </>
  );
}
