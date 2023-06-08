import {defaultLanguage} from '../i18n/ui'
export const preprocessContent = async () => {
  const allPosts = await import.meta.glob("../content/pages/**/*.md");

  const entries = await Promise.all(
    Object.keys(allPosts).map((key) => allPosts[key]())
  );

  return entries.map((entry) => {
    const contentByLanguage = entry.frontmatter;

    return Object.entries(contentByLanguage).map(([language, content]) => {
      if (language === defaultLanguage) {
        return {
          params: { slug: content.slug },
          props: { content, language },
        };
      }

      const defaultLocaleContent = contentByLanguage[defaultLanguage];

      const mergedContent = {
        ...defaultLocaleContent,
        ...content,
      };

      const slug = [language, mergedContent.slug].join("/");

      return {
        params: { slug },
        props: { content: mergedContent, language },
      };
    });
  });
};
