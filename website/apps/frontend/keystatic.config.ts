import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    products: collection({
      label: 'Products',
      slugField: 'title',
      path: 'src/content/products/*/',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        price: fields.integer({ label: 'Price (in INR)', validation: { min: 0 } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Bridal Lehengas', value: 'lehengas' },
            { label: 'Silk Sarees', value: 'sarees' },
            { label: 'Festive Kurtas', value: 'kurtas' },
            { label: 'Accessories', value: 'accessories' },
          ],
          defaultValue: 'lehengas',
        }),
        isNewArrival: fields.checkbox({
          label: 'Is New Arrival?',
          defaultValue: true,
        }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true }),
        about: fields.text({ label: 'The Artisan Story (About)', multiline: true }),
        details: fields.array(
          fields.text({ label: 'Detail Specification' }),
          { label: 'Details & Care Instructions', itemLabel: props => props.value }
        ),
        images: fields.array(
          fields.image({
            label: 'Product Image',
            directory: 'public/images/products',
            publicPath: '/images/products',
          }),
          { label: 'Product Gallery (Images)', itemLabel: props => 'Image' }
        ),
        // Simple manual review aggregations for the CMS editors
        reviewRating: fields.number({ label: 'Average Review Rating', validation: { min: 1, max: 5 }, defaultValue: 5 }),
        reviewCount: fields.integer({ label: 'Total Reviews', validation: { min: 0 }, defaultValue: 0 }),
      },
    }),
  },
});
