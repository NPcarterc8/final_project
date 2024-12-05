/** @type {{ items: { id: number; content: string; date: string; time: string; location: string; workoutType: string; userId: number; }[] }} */
const data = require("../data/comments.json");

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/comments").Comment} Comment
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<Comment>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Comment>>}
 */
async function get(id) {
  const item = data.items.find((comments) => comments.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new user
 * @param {Comment} comments
 * @returns {Promise<DataEnvelope<Comment>>}
 */
async function add(comments) {
  comments.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push({
    ...comments,
    date: comments.date.toISOString(),
    time: comments.time.toISOString(),
  });
  return {
    isSuccess: true,
    data: comments,
  };
}

/**
 * Update a user
 * @param {number} id
 * @param {Comment} comments
 * @returns {Promise<DataEnvelope<Comment>>}
 */
async function update(id, comments) {
  const commentsToUpdate = get(id);
  Object.assign(commentsToUpdate, comments);
  return {
    isSuccess: true,
    data: commentsToUpdate,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const itemIndex = data.items.findIndex((comments) => comments.id == id);
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Item not found",
      data: id,
      status: 404,
    };
  data.items.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
