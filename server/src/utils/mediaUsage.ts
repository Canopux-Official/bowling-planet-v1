import { BaseProduct, ProductItem } from '../models/product'; // adjust path
import Blog from '../models/blog';
import Project from '../models/project';
import { TeamMember } from '../models/team';
import { HomePage } from '../models/HomePage';
import { FranchisePage } from '../models/FranchisePage';
import { ServicesPage } from '../models/ServicesPage';

/**
 * Queries every model that stores images and returns a Set of all
 * publicIds currently referenced anywhere in the database.
 */
export async function getUsedPublicIds(): Promise<Set<string>> {
  const used = new Set<string>();

  const addIfPresent = (media?: { publicId?: string; public_id?: string } | null) => {
    if (media?.publicId) used.add(media.publicId);
    if (media?.public_id) used.add(media.public_id);
  };

  const [baseProducts, productItems, blogs, projects, teamMembers, homePages, franchisePages, servicesPages] = await Promise.all([
    BaseProduct.find({}, { thumbnail: 1 }).lean(),
    ProductItem.find({}, { thumbnail: 1, gallery: 1, usedIn: 1 }).lean(),
    Blog.find({}, { coverImage: 1 }).lean(),
    Project.find({}, { media: 1, setupSteps: 1, testimonials: 1 }).lean(),
    TeamMember.find({}, { image: 1 }).lean(),
    HomePage.find({}, { trustedBrands: 1, productCategories: 1, services: 1, caseStudies: 1 }).lean(),
    FranchisePage.find({}, { whyUs: 1, offerings: 1, process: 1 }).lean(),
    ServicesPage.find({}, { services: 1, processSteps: 1, galleryImages: 1 }).lean(),
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

  homePages.forEach((doc: any) => {
    (doc.trustedBrands || []).forEach((b: any) => addIfPresent(b.image));
    (doc.productCategories || []).forEach((c: any) => addIfPresent(c.image));
    (doc.services || []).forEach((s: any) => addIfPresent(s.image));
    (doc.caseStudies || []).forEach((c: any) => addIfPresent(c.image));
  });

  franchisePages.forEach((doc: any) => {
    (doc.whyUs || []).forEach((w: any) => addIfPresent(w.image));
    (doc.offerings || []).forEach((o: any) => addIfPresent(o.image));
    (doc.process || []).forEach((p: any) => addIfPresent(p.image));
  });

  servicesPages.forEach((doc: any) => {
    (doc.services || []).forEach((s: any) => addIfPresent(s.image));
    (doc.processSteps || []).forEach((p: any) => addIfPresent(p.image));
    (doc.galleryImages || []).forEach((g: any) => addIfPresent(g.image));
  });

  return used;
}
