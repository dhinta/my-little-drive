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
    created_by: v.string(),
    _creationTime: v.number(),
    status: v.string(),
  }).index('created_by', ['created_by']),
});

export default schema;
