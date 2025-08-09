import { getCollection, type CollectionEntry } from 'astro:content'

export async function getArticles(includeDrafts: boolean) {
  const all = await getCollection('articles') as CollectionEntry<'articles'>[]
  return all
    .filter((p: CollectionEntry<'articles'>) => includeDrafts || !p.data.draft)
    .sort((a: CollectionEntry<'articles'>, b: CollectionEntry<'articles'>) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
}

