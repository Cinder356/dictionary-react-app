import { getDB } from "./db";
import { USER_STATS_STORE_NAME, MODULES_METADATA_STORE_NAME } from "../consts/dbConsts";

const STATS_ID = 'global';
const MAX_RECENT_MODULES = 3;

const moduleExists = async (db, moduleId) => {
  const module = await db.get(MODULES_METADATA_STORE_NAME, moduleId);
  return module !== undefined;
};

export const getStats = async () => {
  const db = await getDB();
  const stats = await db.get(USER_STATS_STORE_NAME, STATS_ID);

  if (!stats) return initStats();

  const validModules = [];
  for (const moduleId of stats.recentlyUsedModuleIds || []) {
    if (await moduleExists(db, moduleId)) {
      validModules.push(moduleId);
    }
  }

  return {
    ...stats,
    recentlyUsedModuleIds: validModules,
  };
};

export const initStats = async () => {
  const db = await getDB();
  const existing = await db.get(USER_STATS_STORE_NAME, STATS_ID);
  if (!existing) {
    const initialStats = {
      id: STATS_ID,
      totalSessionsCompleted: 0,
      recentlyUsedModuleIds: [],
    };
    await db.put(USER_STATS_STORE_NAME, initialStats);
    return initialStats;
  }
  return existing;
};

export const incrementSessionsCompleted = async () => {
  const db = await getDB();
  const current = await db.get(USER_STATS_STORE_NAME, STATS_ID);
  if (!current) return initStats();

  const updated = {
    totalSessionsCompleted: current.totalSessionsCompleted + 1,
  };
  await db.put(USER_STATS_STORE_NAME, { ...current, ...updated });
  return updated;
};

export const addRecentlyUsedModule = async (moduleId) => {
  const db = await getDB();

  const exists = await moduleExists(db, moduleId);
  if (!exists) {
    throw new Error(`Module with ID ${moduleId} does not exist`);
  }

  const current = await db.get(USER_STATS_STORE_NAME, STATS_ID);
  if (!current) return initStats();

  const recent = current.recentlyUsedModuleIds || [];
  const filtered = recent.filter(id => id !== moduleId);
  const newArr = [moduleId, ...filtered].slice(0, MAX_RECENT_MODULES);

  const updated = {
    recentlyUsedModuleIds: newArr,
  };
  await db.put(USER_STATS_STORE_NAME, { ...current, ...updated });
  return updated;
};

export const resetStats = async () => {
  const db = await getDB();
  await db.delete(USER_STATS_STORE_NAME, STATS_ID);
  return initStats();
};
