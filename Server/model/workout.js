/** @type {{ items: { id: number; content: string; date: string; time: string; location: string; workoutType: string; userId: number; }[] }} */
import data from "../data/workout.json";
// Removed unused variable workoutData

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/models/workout").Workout & { time: string; location: string; workoutType: string; duration: string }} Workout

/**
 * @typedef {import("../../Client/src/models/workout").Workout & { location: string }} workout
 */

/**
 * Get all workouts
 * @returns {Promise<DataListEnvelope<Workout<any>>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data,
    total: data.length,
  };
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Workout<any>>>}
 */
async function get(id) {
  const item = data.find((workout) => workout.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new workout
 * @param {Workout<any>} workout
 * @returns {Promise<DataEnvelope<Workout<any>>>}
 */
async function add(workout) {
  workout.id = data.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.push({
    id: workout.id,
    date: workout.date.toString(),
    type: workout.workoutType,
    duration: workout.duration,
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
 * @param {Workout<any>} workout
 * @param {Workout<any>} workout
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
  const itemIndex = data.findIndex((workout) => workout.id == id);
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
