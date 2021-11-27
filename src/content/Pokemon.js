import React from 'react';

import { Row,
  Col,
  ProgressBar} from 'react-bootstrap';

const pokemonAPI = require('../pokemonAPI.js');

class PokemonView extends React.Component {

  constructor(props)
  {
    super(props);
    //this.state = { pokemon: props.pokemon };

    //let pok = new pokemonAPI(props.pokemon);
    let pok = new pokemonAPI(this.props.pokemon);
    let hint;

    if (pok.id === null)
    {
      const levenshtein = require('js-levenshtein');
      let pokemonNames = pok.getPokemonNames();
      let toFind = this.props.pokemon.toLowerCase();

      let lev = [];
      for (let i in pokemonNames) {
        if (pokemonNames.hasOwnProperty(i)) {
          let p = pokemonNames[i].toLowerCase();

          //lev[p.replaceAll(' ','_')] = levenshtein(this.props.pokemon,p);
          lev.push({
            name: p,
            lev: levenshtein(toFind,p)
          });
          //lev.push(levenshtein(this.props.pokemon,p));
        }
      }
      lev.sort((a,b) => {
        return a.lev > b.lev;
      });

      hint = lev[0];
      hint = (hint.lev <= 3) ? hint.name : null;


      pok = null;
    }

    this.state = {
      pokemon: pok,
      hint: hint
    };
    /*this.setState({
      pokemon: pok
    });*/
  }

  renderEvolutions()
  {
    let evolutions = this.state.pokemon.evolution;

    if (typeof evolutions !== 'undefined' && Object.keys(evolutions).length > 0) {
      let toReturn = [];
      if (typeof evolutions.pastBranch !== 'undefined') {
        toReturn.push(<div key="past">Poprzednia <a
            href={'#'+evolutions.pastBranch.id.toLowerCase()}
            className="pokemonLink"
          >{evolutions.pastBranch.name}</a>
          </div>);
      }
      if (typeof evolutions.futureBranches !== 'undefined' &&
            Object.keys(evolutions.futureBranches).length > 0) {
        let nextForms = evolutions.futureBranches.map((p) => {
          return <li
              key={p.name}><a
              className={p.name.toUpperCase()}
              href={"#"+p.id.toLowerCase()}
            >{p.name}</a></li>;
        });
        toReturn.push(<div key="future">Następne: <ul>{nextForms}</ul></div>);
      }
      return toReturn;
    }
    else {
      return <span>Ten pokemon nie ma żadnych ewolucji.</span>;
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
      return <span>To jedyna forma tego pokemona.</span>
    }
  }

  render() {

    if (this.state.pokemon !== null) {

      let pokImage = this.state.pokemon.id.replaceAll('_','-').toLowerCase().replace('alola','alolan');
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
          Ewolucje:<br />
          {this.renderEvolutions()}
          <hr />
          Inne formy: {this.renderForms()}
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
