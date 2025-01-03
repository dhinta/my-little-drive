import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    googleId: v.optional(v.string()),
    githubId: v.optional(v.string()),
  }).index('email', ['email']),
  tags: defineTable({
    name: v.string(),
    created_by: v.id('users'),
    status: v.string(),
  }).index('created_by', ['created_by']),
  assets: defineTable({
    name: v.string(),
    content: v.optional(v.string()),
    path: v.optional(v.string()),
    type: v.string(),
    doc_type: v.optional(v.string()),
    doc_id: v.optional(v.id('_storage')),
    created_by: v.id('users'),
    size: v.number(),
    status: v.string(),
    parent: v.optional(v.id('assets')),
  }).index('by_name_created_by', ['name', 'created_by']),
  asset_tags: defineTable({
    asset_id: v.id('assets'),
    tag_id: v.id('tags'),
  }),
  asset_users: defineTable({
    asset_id: v.id('assets'),
    user_id: v.id('users'),
    ownerType: v.string(),
  })
    .index('by_asset_id', ['asset_id'])
    .index('by_ownerType', ['ownerType']),
});

export default schema;
