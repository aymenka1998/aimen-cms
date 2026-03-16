import type { Schema, Struct } from '@strapi/strapi';

export interface SharedTags extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.tags': SharedTags;
    }
  }
}
