import Dexie from "dexie";

const db = new Dexie("MeuBancoPesquisas");

db.version(1).stores({
  pesquisas: "++id, hash_id, nome, descricao", 
});

export default db;
