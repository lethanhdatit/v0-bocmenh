import { SlugPayload, SlugTypes } from '@/lib/seo/slug/slugGeneration';
import merge from 'lodash/merge';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

const AffiliateProduct = dynamic(() => import('../affiliate/page'));

type PageFactoryType<T = any> = Partial<
  Record<SlugTypes, ComponentType<T>>
>;

const pageFactory: PageFactoryType = {
  [SlugTypes.AFFILIATE]: AffiliateProduct,
};

const SlugPageFactory = (props: {
  params: Record<string, string>;
  payload: SlugPayload;
}) => {
  const { payload } = props;
  const { type, ids } = payload;
  const Cmp = pageFactory[type];

  if (!Cmp) {
    notFound();
  }

  return <Cmp {...merge(props, { params: { id: ids[0] } })} />;
};

export default SlugPageFactory;
