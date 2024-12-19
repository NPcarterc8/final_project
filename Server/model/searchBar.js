const SearchBar = require("../../Client/src/components/SearchBar.vue");
const { search: searchController } = require("../controllers/searchbar.js");
const data = require("../data/user.json");
const { getConnection } = require("./supabase.js");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/searchbar").Searchbar} Searchbar
 */

async function search(query) {
  const { data, error, count } = await conn

    .from("user")

    .select("*", { count: "estimated" })

    .or(`username.ilike.*${query}*`)

    .or(`email.ilike.*${query}*`);

  return {
    isSuccess: !error,

    data: data,

    total: count,

    message: error ? error.message : undefined,
  };
}

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<Searchbar>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("user")
    .select("*", { count: "estimated" });
  /** @type Searchbar[] */
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
 * @returns {Promise<DataEnvelope<Searchbar>>}
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
 * @param {Searchbar} searchBar
 * @returns {Promise<DataEnvelope<Searchbar>>}
 */
async function add(searchBar) {
  searchBar.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  //data.items.push(searchBar);
  return {
    isSuccess: true,
    data: searchBar,
  };
}
async function seed() {
  for (const user of data.items) {
    //await add(SearchBar);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {Searchbar} user
 * @returns {Promise<DataEnvelope<Searchbar>>}
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
  search,
};
