import { Characters } from "../../components/Characters";
import { EpisodeForm } from "../../components/EpisodeForm";
import { Locations } from "../../components/Locations";

import { EpisodeProvider } from "../../hooks/Episode";

export function Home() {
  return (
    <EpisodeProvider>
      <EpisodeForm />
      <Characters />
      <Locations />
    </EpisodeProvider>
  );
}