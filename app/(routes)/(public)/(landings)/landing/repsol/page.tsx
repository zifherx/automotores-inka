import { RepsolView } from "./components/Repsol-View";

export default function RepsolLandingPage() {
  const linkLandingExternoRepsol = process.env.LINK_EXTERNAL_REPSOL as string;

  return (
    <div>
      <RepsolView linkRedirection={linkLandingExternoRepsol} />
    </div>
  );
}
