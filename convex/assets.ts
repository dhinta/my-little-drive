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

    const assets = await ctx.db
      .query('assets')
      .filter(
        asset =>
          asset.eq(asset.field('created_by'), userId) &&
          asset.eq(asset.field('status'), 'active'),
      )
      .collect();

    return Promise.all(
      assets.map(async ({ name, _creationTime, parent, _id, created_by }) => {
        const tagsList = await ctx.db
          .query('asset_tags')
          .filter(tag => tag.eq(tag.field('asset_id'), _id))
          .collect();

        const tags = await Promise.all(
          tagsList.map(async ({ tag_id }) => {
            const { name } = (await ctx.db.get(tag_id))!;
            return { name, tag_id };
          }),
        );

        return {
          _id,
          name,
          type: 'folder',
          size: 0,
          created_by,
          _creationTime,
          status: 'active',
          parent,
          tags,
        };
      }),
    );
  },
});

export const addFolder = mutation({
  args: {
    name: v.string(),
    status: v.string(),
    size: v.number(),
    type: v.string(),
  },
  handler: async (ctx, { name, status, size, type }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    const assetId = await ctx.db.insert('assets', {
      name,
      created_by: userId,
      status,
      size,
      type,
    });
    await ctx.db.insert('asset_users', {
      asset_id: assetId,
      user_id: userId,
      ownerType: 'owner',
    });
    return assetId;
  },
});

// export const remove = mutation({
//   args: { _id: v.id('tags') },
//   handler: async (ctx, { _id }) => {
//     const userId = await getAuthUserId(ctx);
//     if (userId === null) {
//       throw new Error('Not signed in');
//     }

//     await ctx.db.patch(_id, { status: 'deleted' });
//   },
// });

export const updateAssetName = mutation({
  args: { _id: v.id('assets'), name: v.string() },
  handler: async (ctx, { _id, name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    await ctx.db.patch(_id, { name });
  },
});
