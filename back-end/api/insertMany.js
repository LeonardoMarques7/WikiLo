import { fotosArray } from "../../front-end/api/api.js";
import { albunsArray } from "../../front-end/src/assets/database/Albuns.js";
import { songsArray } from "../../front-end/src/assets/database/Songs.js";
import { db } from "./connect.js";

const newAlbunsArray = albunsArray.map((currentAlbumObj) => {
  const newAlbumObj = { ...currentAlbumObj };
  return newAlbumObj;
});

const newSongsArray = songsArray.map((currentSongObj) => {
  const newSongObj = { ...currentSongObj };
  return newSongObj;
});

const newfotosArray = fotosArray.map((currentfotoObj) => {
  const newfotoObj = { ...currentfotoObj };
  return newfotoObj;
});

if (newSongsArray.length > 0) {
  const responseSongs = await db.collection("songs").insertMany(newSongsArray);
  console.log("Songs insert response:", responseSongs);
} else {
  console.log("Nenhuma música para inserir.");
}

if (newAlbunsArray.length > 0) {
  const responseAlbuns = await db.collection("albuns").insertMany(newAlbunsArray);
  console.log("Albuns insert response:", responseAlbuns);
} else {
  console.log("Nenhum álbum para inserir.");
}

if (newfotosArray.length > 0) {
  const responsefotos = await db.collection("pictures").insertMany(newfotosArray);
  console.log("foto insert response:", responsefotos);
} else {
  console.log("Nenhuma foto para inserir.");
}
