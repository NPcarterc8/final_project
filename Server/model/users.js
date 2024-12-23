/** @type {{ items: User[] }} */
const data = require("../data/user.json");
const { getConnection } = require("./supabase.js");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/user").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("user")
    .select("*", { count: "estimated" });
  /** @type User[] */
  const users = data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
    age: user.age,
    firstName: user.first_name,
    birthDate: user.birth_date,
    lastName: user.last_name,
    image: user.image,
    university: user.university,
    phone: user.phone,
  }));
  return {
    isSuccess: !error,
    data: users,
    total: count,
    message: error ? error.message : undefined,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
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
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
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
  for (const user of data.items) {
    await add(user);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
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
