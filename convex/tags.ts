import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error('Not signed in');
    }

    const tags = await ctx.db.query('tags').collect();
    return tags.filter(t => t.created_by === userId && t.status === 'active');
  },
});

export const add = mutation({
  args: { name: v.string(), created_by: v.string(), status: v.string() },
  handler: async (ctx, { name, created_by, status }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    await ctx.db.insert('tags', { name, created_by, status });
  },
});

export const remove = mutation({
  args: { _id: v.id('tags') },
  handler: async (ctx, { _id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    await ctx.db.patch(_id, { status: 'deleted' });
  },
});

export const update = mutation({
  args: { _id: v.id('tags'), name: v.string() },
  handler: async (ctx, { _id, name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    await ctx.db.patch(_id, { name });
  },
});
