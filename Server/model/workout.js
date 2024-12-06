/** @type {{ items: { id: number; type: string; duration: string; date: string; userId: number; }[] }} */
import data from "../data/workout.json";

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/post").Post & { postType?: string, type?: string, duration?: string }} Post
 */

/**
 * Get all posts
 * @returns {Promise<DataListEnvelope<Post>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data,
    total: data.length,
  };
}

/**
 * Get a post by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function get(id) {
  const item = data.find((post) => post.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new post
 * @param {Post} post
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function add(post) {
  post.id = data.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.push({
    id: post.id,
    type: post.type || "defaultType",
    duration: post.duration || "defaultDuration",
    date: new Date(post.date).toISOString(),
    userId: post.userId || 0,
  });
  return {
    isSuccess: true,
    data: post,
  };
}

/**
 * Update a post
 * @param {number} id
 * @param {Post} post
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function update(id, post) {
  const { data: postToUpdate } = await get(id);
  Object.assign(postToUpdate, post);
  return {
    isSuccess: true,
    data: postToUpdate,
  };
}

/**
 * Remove a post
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const itemIndex = data.findIndex((post) => post.id == id);
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Item not found",
      data: id,
      status: 404,
    };
  data.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
