import { BaseProduct, ProductItem } from '../models/product'; // adjust path
import Blog from '../models/blog';
import Project from '../models/project';
import { TeamMember } from '../models/team';

/**
 * Queries every model that stores images and returns a Set of all
 * publicIds currently referenced anywhere in the database.
 */
export async function getUsedPublicIds(): Promise<Set<string>> {
  const used = new Set<string>();

  const addIfPresent = (media?: { publicId?: string } | null) => {
    if (media?.publicId) used.add(media.publicId);
  };

  const [baseProducts, productItems, blogs, projects, teamMembers] = await Promise.all([
    BaseProduct.find({}, { thumbnail: 1 }).lean(),
    ProductItem.find({}, { thumbnail: 1, gallery: 1, usedIn: 1 }).lean(),
    Blog.find({}, { coverImage: 1 }).lean(),
    Project.find({}, { media: 1, setupSteps: 1, testimonials: 1 }).lean(),
    TeamMember.find({}, { image: 1 }).lean(),
  ]);

  baseProducts.forEach((doc: any) => addIfPresent(doc.thumbnail));

  productItems.forEach((doc: any) => {
    addIfPresent(doc.thumbnail);
    (doc.gallery || []).forEach(addIfPresent);
    (doc.usedIn || []).forEach((loc: any) => (loc.images || []).forEach(addIfPresent));
  });

  blogs.forEach((doc: any) => addIfPresent(doc.coverImage));

  projects.forEach((doc: any) => {
    (doc.media || []).forEach(addIfPresent);
    (doc.setupSteps || []).forEach((step: any) => addIfPresent(step.image));
    (doc.testimonials || []).forEach((t: any) => addIfPresent(t.clientImage));
  });

  teamMembers.forEach((doc: any) => addIfPresent(doc.image));

  return used;
}