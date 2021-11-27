
//const move = require('./data/move.json');
//const type = require('./data/type.json');
//const avatarCustomization = require('./data/avatar-customization.json');
//const items = require('./data/item.json');

class pokemonAPI {

  pokemon = require('./data/pokemon.json');
  pokemon_second = require('./data/pokemon_2.json');
  pokemonName = null;
  id = null;

  constructor (pokemonName = null) {

    this.pokemon = this.updateArray(this.pokemon,this.pokemon_second);

    ['Attack','Defense','Stamina'].map((prop) => {
      this['max'+prop] = Math.max(...this.pokemon.map((p) => {
        return !isNaN(p.stats['base'+prop]) ? parseInt(p.stats['base'+prop]) : 0;
      }));
      return true;
    });
    this.definitiveMaxCp = Math.max(...this.pokemon.map((p) => {
      return !isNaN(p.maxCP) ? p.maxCP : 0;
    }));
    /*console.log(['Attack','Defense','Stamina'].map((prop) => {
      return this['max'+prop];
    }));*/

    if (pokemonName !== null) {
      this.pokemonName = pokemonName;

      let result = this.find(this.pokemonName);

      if (result !== false) {
        for (let p in result) {
          if (result.hasOwnProperty(p)) {
            this[p] = result[p];
          }
        }
      }
    }
  }

  getPokemonNames() {
    return this.pokemon.map((p) => {
      return p.name;
    });
  }

  updateArray(first,second) {
    for (let i in first)
    {
      if (first.hasOwnProperty(i)) {
        let id = first[i].id;
        let left = this.find(id);
        let right = this.find(id,this.pokemon_second);
        if (left !== false && right !== false) {
          first[i] = this.assign(left,right);
        }
      }
    }
    return first;
  }

  assign(left,right) {
    let obj = Object.assign({},left,right);
    for (let i in left) {
      if (left.hasOwnProperty(i) && right.hasOwnProperty(i)) {
        if (Object.keys(left[i]).length === 0) {
          obj[i] = right[i];
        }
        else if (Object.keys(right[i]).length === 0) {
          obj[i] = left[i];
        }
      }
    }
    return obj;
  }

  findBy(toFind,column,dataCollection = null) {
    if (dataCollection == null) {
      dataCollection = this.pokemon;
    }
    let filtered = dataCollection.filter(function(el) {
      return el[column] === toFind;
    });
    return filtered;
  }

  find(id = null,dataCollection = null)
  {
    if (dataCollection == null) {
      dataCollection = this.pokemon;
    }

    if (id == null) {
      return false;
    }
    let by;

    if (isNaN(id)) {
      //by = 'name';
      id = id.toUpperCase().replaceAll(' ','_');
    }

    if (isNaN(id) &&
                id === id.toUpperCase()) {
      by = 'id';
    }
    else {
      by = 'dex';
      id = parseInt(id);
    }

    let found = this.findBy(id,by,dataCollection);

    let result = found.slice(0,Math.min(1,found.length));

    if (result.length === 1) {
      return result[0];
    }
    else {
      return false;
    }
  }

  getTypes()
  {
    return this.types.map((types) => {
      return types.name;
    });
  }

}

module.exports = pokemonAPI;
