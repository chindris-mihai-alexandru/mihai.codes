import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const canonicalUrl = new URL(loc.url.pathname, loc.url.origin).href;

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {head.meta.map((m, i) => (
        <meta key={m.key ?? `meta-${i}`} {...m} />
      ))}

      {head.links.map((l, i) => (
        <link key={l.key ?? `link-${i}`} {...l} />
      ))}

      {head.styles.map((s, i) => (
        <style key={s.key ?? `style-${i}`} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
