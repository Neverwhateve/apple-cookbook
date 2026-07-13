import type { MetadataRoute } from "next";
import {
  getIndexableArticles,
  getPublishedArticles,
  getPublishedCategories,
  getPublishedTags
} from "@/lib/cookbook";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cookbook.wuxiela.fun";

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publicArticles = getPublishedArticles();
  const indexableArticles = getIndexableArticles(publicArticles);
  const latestArticleDate = publicArticles.reduce((latest, article) => (article.updated > latest ? article.updated : latest), "");
  const latestModified = latestArticleDate ? new Date(`${latestArticleDate}T00:00:00.000Z`) : new Date();

  return [
    { url: absoluteUrl("/"), lastModified: latestModified, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/categories"), lastModified: latestModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/tags"), lastModified: latestModified, changeFrequency: "weekly", priority: 0.7 },
    ...indexableArticles.map((article) => ({
      url: absoluteUrl(article.route),
      lastModified: new Date(`${article.updated}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: article.popular ? 0.9 : 0.8
    })),
    ...getPublishedCategories(publicArticles).map((category) => ({
      url: absoluteUrl(`/categories/${encodeURIComponent(category.name)}`),
      lastModified: latestModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...getPublishedTags(publicArticles).map((tag) => ({
      url: absoluteUrl(`/tags/${encodeURIComponent(tag)}`),
      lastModified: latestModified,
      changeFrequency: "weekly" as const,
      priority: 0.5
    }))
  ];
}
