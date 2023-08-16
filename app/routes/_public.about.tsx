import { addStyleSheets } from "~/utils/helpers";
import aboutStyles from "~/styles/about.css";

export const links = addStyleSheets(aboutStyles);

export default function About() {
  return (
    <main className="about">
      <article>
        <h1>One Art Please!</h1>
        <p>
          Art vs Art is a simple game. Simple, yet mesmerizing. The next Wordle,
          if you will.
        </p>

        <p>
          It's a place for me to try out some new web things and have a bit of
          fun. I've generated the descriptions using ChatGPT, so if something is
          off, let me know! I use Bing image search API to find images - if I'm
          using your image without permission, also reach out.
        </p>
      </article>
    </main>
  );
}
