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
      assets.map(
        async ({ name, _creationTime, parent, _id, created_by, type }) => {
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
            type,
            size: 0,
            created_by,
            _creationTime,
            status: 'active',
            parent,
            tags,
          };
        },
      ),
    );
  },
});

export const addFolder = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    const assetId = await ctx.db.insert('assets', {
      name,
      created_by: userId,
      status: 'active',
      size: 0,
      type: 'folder',
    });
    await ctx.db.insert('asset_users', {
      asset_id: assetId,
      user_id: userId,
      ownerType: 'owner',
    });
    return assetId;
  },
});

export const addNote = mutation({
  args: {
    name: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, { name, content = '' }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    const assetId = await ctx.db.insert('assets', {
      name,
      content,
      created_by: userId,
      status: 'active',
      size: 0,
      type: 'note',
    });
    await ctx.db.insert('asset_users', {
      asset_id: assetId,
      user_id: userId,
      ownerType: 'owner',
    });
    return assetId;
  },
});

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl();
});

export const addDocument = mutation({
  args: {
    fileId: v.id('_storage'),
    name: v.string(),
  },
  handler: async (ctx, { fileId, name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not signed in');
    }

    const metadata = await ctx.storage.getMetadata(fileId);
    if (!metadata) {
      throw new Error('File not found');
    }

    const assetId = await ctx.db.insert('assets', {
      name: name,
      path: await ctx.storage.generateUploadUrl(),
      doc_type: metadata.contentType!,
      doc_id: fileId,
      created_by: userId,
      status: 'active',
      size: metadata.size,
      type: 'document',
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
