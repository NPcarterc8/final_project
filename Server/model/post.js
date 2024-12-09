/** @type {{ items: Post[] }} */
const data = require("../data/post.json");
const { getConnection } = require("./supabase.js");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/post").Post} Post
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<Post>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("products")
    .select("*", { count: "estimated" });
  return {
    isSuccess: true,
    data: data,
    total: count,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function get(id) {
  const item = data.items.find((user) => user.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new user
 * @param {Post} user
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function add(user) {
  user.id = data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(user);
  return {
    isSuccess: true,
    data: user,
  };
}
async function seed() {
  for (const post of data.items) {
    await add(post);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {Post} user
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function update(id, user) {
  const userToUpdate = await get(id);
  Object.assign(userToUpdate.data, user);
  return {
    isSuccess: true,
    data: userToUpdate.data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const itemIndex = data.items.findIndex((user) => user.id == id);
  if (itemIndex === -1)
    throw { isSuccess: false, message: "Item not found", data: id };
  data.items.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
};