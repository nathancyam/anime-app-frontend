import idb from 'idb';

const ANIME_DB = 'anime_db';
const ANIME_STORE = 'anime_store';
const CURRENT_VERSION = 1;

let _db;

const dbPromise = async () => {
  if (!_db) {
    _db = await idb.open(ANIME_DB, CURRENT_VERSION, upgradeDb => {
      switch (upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore(ANIME_STORE, {
            keyPath: '_id',
          });
      }
    });
  }

  return await _db;
};

const getTransaction = async (store, connType = 'readonly') => {
  const db = await dbPromise();
  return await db.transaction(store, connType);
};

export const getAllAnime = async () => {
  const tx = await getTransaction(ANIME_STORE);
  return await tx.objectStore(ANIME_STORE).getAll();
};

export const getAnimeById = async (id) => {
  const tx = await getTransaction(ANIME_STORE);
  return await tx.objectStore(ANIME_STORE).get(id);
};

export const setAnime = async (anime) => {
  const tx = await getTransaction(ANIME_STORE, 'readwrite');
  const store = tx.objectStore(ANIME_STORE);

  if (Array.isArray(anime)) {
    return await Promise.all(anime.map(a => store.put(a)));
  }

  return await store.put(anime);
};

export default { getTransaction, getAllAnime, getAnimeById, setAnime };

