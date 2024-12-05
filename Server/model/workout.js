/** @type {{ items: { id: number; content: string; date: string; time: string; location: string; workoutType: string; userId: number; }[] }} */
const data = require("../data/workout.json");

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/Workout").workout} workout
 */

/**
 * Get all workouts
 * @returns {Promise<DataListEnvelope<Workout>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function get(id) {
  const item = data.items.find((workout) => workout.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new workout
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function add(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push({
    id: workout.id,
    content: workout.content,
    date: workout.date.toISOString(),
    time: workout.time.toISOString(),
    location: workout.location,
    workoutType: workout.workoutType,
    userId: workout.userId,
  });
  return {
    isSuccess: true,
    data: workout,
  };
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(id, workout) {
  const workoutToUpdate = get(id);
  Object.assign(workoutToUpdate, workout);
  return {
    isSuccess: true,
    data: workoutToUpdate,
  };
}

/**
 * Remove a workout
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const itemIndex = data.items.findIndex((workout) => workout.id == id);
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
