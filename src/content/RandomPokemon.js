import React from 'react';
import { Row,
  Col} from 'react-bootstrap';

import pokemonAPI from '../pokemonAPI.js';

class RandomPokemon extends React.Component {

  render() {
    const names = new pokemonAPI().getPokemonNames();
    let randomPok = names[Math.floor(Math.random() * names.length)];
    randomPok = new pokemonAPI(randomPok);

    let pokImage = randomPok.id.replaceAll('_','-').toLowerCase().replace('alola','alolan');
    pokImage = pokImage.split('-')[0];

    return <Row><Col className='col-12'>Random pokemon:</Col>
      <Col key="random" className='col-12 d-flex align-items-end'>
        <Row>
          <a
            href={'#'+randomPok.id.toLowerCase()}
          >
            <Col
              key="img"
              className="d-flex justify-content-center col-12"
            >
            <img
              src={'https://img.pokemondb.net/sprites/black-white/anim/normal/'+pokImage+'.gif'}
              alt={randomPok.name + pokImage}
            />
            </Col>
            <Col
              key="name"
              className="d-flex justify-content-center col-12"
            >
              <span>{randomPok.name}</span>
            </Col>
          </a>
          <Col
            key="rand"
            className="d-flex justify-content-center col-12"
          >
            <a href="#random">Random</a>
          </Col>
        </Row>
      </Col>
    </Row>;
  }

}

export default RandomPokemon;
