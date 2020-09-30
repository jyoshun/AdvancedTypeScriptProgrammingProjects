"use strict";
/*! *****************************************************************************
映射
***************************************************************************** */
var Genre;
(function (Genre) {
    Genre[Genre["Rock"] = 0] = "Rock";
    Genre[Genre["CountryAndWestern"] = 1] = "CountryAndWestern";
    Genre[Genre["Classical"] = 2] = "Classical";
    Genre[Genre["Pop"] = 3] = "Pop";
    Genre[Genre["HeavyMetal"] = 4] = "HeavyMetal";
})(Genre || (Genre = {}));
class MusicCollection {
    constructor() {
        this.collection = new Map();
    }
    Add(genre, artist) {
        for (let individual of artist) {
            this.AddArtist(genre, individual);
        }
    }
    Get(genre) {
        return this.collection.get(genre);
    }
    AddArtist(genre, artist) {
        if (!this.collection.has(genre)) {
            this.collection.set(genre, []);
        }
        let artists = this.collection.get(genre);
        if (artists) {
            artists.push(artist);
        }
    }
}
let collection = new MusicCollection();
collection.Add(Genre.Classical, ['Debussy', 'Bach', 'Elgar', 'Beethoven']);
collection.Add(Genre.CountryAndWestern, ['Dolly Parton', 'Toby Keith', 'Willie Nelson']);
collection.AddArtist(Genre.HeavyMetal, 'Iron Maiden');
collection.Add(Genre.HeavyMetal, ['Tygers of Pan Tang', 'Saxon', 'Doro']);
collection.Add(Genre.Pop, ['Michael Jackson', 'Abba', 'The spice Girls']);
collection.Add(Genre.Rock, ['Deep Purple', 'Led Zeppelin', 'The Dixie Dregs']);
//# sourceMappingURL=1.3.10.Map.js.map