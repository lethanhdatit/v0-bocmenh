/* eslint-disable consistent-return */

// import { getProductSlugMetadata } from '@/seo/getProductMetadata';
import { decodeSlug } from '@/lib/seo/slug/slugGeneration';
import { notFound } from 'next/navigation';
import SlugPageFactory from './_slug-page-factory';

// export async function generateMetadata(props) {
//   const params = await props.params;
//   try {
//     return await getProductSlugMetadata(params.slug, params.lang);
//   } catch {
//     return null;
//   }
// }
const Page = ({ params }: { params: { lang: string; slug: string } }) => {
  try {
    const data = decodeSlug(params.slug);

    return <SlugPageFactory params={params} payload={data} />;
  } catch {
    notFound();
  }
};

export default Page;
