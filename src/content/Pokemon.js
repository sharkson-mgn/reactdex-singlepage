import React from 'react';

import { Row,
  Col,
  ProgressBar} from 'react-bootstrap';

import levenshtein from 'js-levenshtein';
import pokemonAPI from '../pokemonAPI.js';

import replaceAll from '../replaceAllHook';

class PokemonView extends React.Component {

  constructor(props)
  {
    super(props);

    let pok = new pokemonAPI(this.props.pokemon);
    let hint = null;

    if (pok.id === null)
    {
      let pokemonNames = pok.getPokemonNames();
      let toFind = this.props.pokemon.toLowerCase();

      let lev = [];
      for (let i in pokemonNames) {
        if (pokemonNames.hasOwnProperty(i)) {

          let p = pokemonNames[i].toLowerCase();

          lev.push({
            name: p,
            lev: levenshtein(toFind,p)
          });
        }
      }
      lev.sort((a,b) => {
        return a.lev > b.lev;
      });

      if (lev[0].lev <= 3) {
        hint = lev[0].name;
      }

      pok = null;
    }

    this.state = {
      pokemon: pok,
      hint: hint
    };
  }

  renderEvolutions()
  {
    let evolutions = this.state.pokemon.evolution;

    //at first check maintly if pokemon require evolution
    if (
          typeof evolutions !== 'undefined' &&
          Object.keys(evolutions).length > 0
        ) {

      let toReturn = []; //in this has store elements about evo

      if (typeof evolutions.pastBranch !== 'undefined') {

        toReturn.push( //push previous evolution if exists
          <div key="past">previous <a
            href={'#'+evolutions.pastBranch.id.toLowerCase()}
          >{evolutions.pastBranch.name}</a>
          </div>
        );
      }

      if (
            typeof evolutions.futureBranches !== 'undefined' &&
            Object.keys(evolutions.futureBranches).length > 0
          ) {

        let nextForms = evolutions.futureBranches.map((p) => {
          return <li
              key={p.name}><a
              href={"#"+p.id.toLowerCase()}
            >{p.name}</a></li>;
        });

        toReturn.push(<div key="future">Next: <ul>{nextForms}</ul></div>);
      }
      return toReturn;

    }
    else {

      return <span>This pokemon has no evolutins.</span>;

    }
  }

  renderTypes()
  {
    return this.state.pokemon.getTypes().map((type) => {
      let className = [
        'type',
        type.toLowerCase()
      ].join(' ');
      return <span className={className} key={type}>{type}</span>
    });
  }

  renderForms() {
    if (this.state.pokemon.forms.length > 0)
    {
      return <select onChange={this.props.onChangePokemonForm} defaultValue={this.state.pokemon.id}>
      {this.state.pokemon.forms.map((pok) => {
        let visibleName = pok.name.replace(this.state.pokemon.forms[0].name,'');
        if (visibleName === '')
          visibleName = 'Normal';
        return <option key={pok.id} value={pok.id}>{visibleName}</option>;
      })}
      </select>;
    }
    else {
      return <span>This is only one form this pokemon.</span>
    }
  }

  render() {

    if (this.state.pokemon !== null) {

      let pokImage = replaceAll(this.state.pokemon.id,'_','-').toLowerCase().replace('alola','alolan');
      pokImage = pokImage.split('-')[0];

      return <Row key={this.state.pokemon.dex}>
        <Col key="pokPreview" className={['col-12 col-sm-4'].join(' ')}>
          <h3>{this.state.pokemon.name}</h3>
          #{this.state.pokemon.dex} {this.renderTypes()}<br />
          <img className={'d-block mx-auto mt-4 w-50'} src={'https://img.pokemondb.net/artwork/'+pokImage+'.jpg'} alt={this.state.pokemon.name + pokImage}/>
        </Col>
        <Col key="pokStats">
          <Row>
            <Col className={'col-2 col-sm-3'} key="miniImg">
              <img className={'d-block mx-auto mt-1'} src={'https://img.pokemondb.net/sprites/black-white/anim/normal/'+pokImage+'.gif'} alt={this.state.pokemon.name + pokImage} />
            </Col>
            <Col key="stats">
              {['Attack','Defense','Stamina'].map((prop) => {
                let variant;
                switch (prop) {
                  case 'Attack': variant = 'danger'; break;
                  case 'Defense': variant = 'success'; break;
                  case 'Stamina': variant = 'info'; break;
                  default: variant = 'warning';
                }
                return <span
                    key={prop}>{prop}: {this.state.pokemon.stats['base'+prop]}
                  <ProgressBar
                      key={prop}
                      variant={variant}
                      now={this.state.pokemon.stats['base'+prop]}
                      max={this.state.pokemon['max'+prop]}
                    />
                  </span>;
              })}
              <span key="maxCp">max CP: {this.state.pokemon.maxCP}
                <ProgressBar key="maxCP" variant='warning' now={this.state.pokemon.maxCP} max="5000" />
                </span>
              </Col>
            </Row>
          <hr />
          Evolutions:<br />
          {this.renderEvolutions()}
          <hr />
          Other forms: {this.renderForms()}
        </Col>
      </Row>;
    }
    else {
      return <span>Nie znaleziono pokemona <b>{this.props.pokemon}</b>.{this.state.hint !== null ?
        <span><br />Czy chodziło Ci o <a href={'#'+this.state.hint} onClick={this.props.navigationHandler}>{this.state.hint}</a>?</span>
        : ''}</span>;
    }
  }

}

export default PokemonView;
