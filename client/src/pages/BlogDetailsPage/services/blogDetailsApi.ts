import {
  mockBlogs,
  mockBlogsListView,
  type BlogListItem,
  type IBlog,
} from '../../InsightsPage/services/mockBlogs'

export type { BlogListItem, IBlog }

export async function getBlogBySlug(slug: string): Promise<IBlog> {
  // TODO: implement API call
  const found = mockBlogs.find((b) => b.slug === slug)
  return Promise.resolve(found ?? mockBlogs[0])
}

export async function getRelatedBlogs(
  slug: string,
  limit = 3,
): Promise<BlogListItem[]> {
  // TODO: implement API call
  const current = mockBlogsListView.find((b) => b.slug === slug)
  const related = mockBlogsListView
    .filter((b) => b.slug !== slug)
    .filter((b) =>
      current ? b.tags.some((t) => current.tags.includes(t)) : true,
    )
    .slice(0, limit)

  // Fallback if tag overlap is thin.
  const result =
    related.length > 0
      ? related
      : mockBlogsListView.filter((b) => b.slug !== slug).slice(0, limit)

  return Promise.resolve(result)
}
