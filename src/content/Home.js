import { Row,
  Col} from 'react-bootstrap';

import LatestView from './Latest.js';

function HomeView(props) {

  return <Row>
    <Col
      key="appDesc"
      className={['col-6','mb-4'].join(' ')}
      style={{textAlign: 'justify'}}>
      Hello in ReactDex! This is simple Pokedex app
      using the <b>React.js</b> framework. Its simple to start! Type name
      or dex number in search input.<br />
      Why "Poke"? Thanks to this, I have a large collection of data, with
      a lot of exceptions so the app is not that simple.<br />
      <br />
      This is <u>single-page</u> app edition, used...<br />
      <ul>
        <li><a href="https://nodejs.org/">Node.js</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a>)</li>
        <li><a href="https://reactjs.org/">React.js</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a>)</li>
        <li><a href="https://react-bootstrap.github.io/">React Bootstrap</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a>)</li>
        <li><a href="https://jquery.com/">jQuery</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a>)</li>
        <li><a href="https://jqueryui.com/">jQuery-ui</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a>)</li>
        <li><a href="https://github.com/gustf/js-levenshtein">js-levenshtein</a> (<a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a> © Gustaf Andersson)</li>
        <li>Pokemon ilustrations are from <a href="https://pokemondb.net/about">PokemonDB</a></li>
        <li>Data collection are from ./output directory in .json format from <a href="https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex">here</a> and <a href="https://github.com/domizei385/pokemongo-json-pokedex">here</a>, joined, updated data (both under <a href="https://en.wikipedia.org/wiki/Apache_License">Apache-2.0 License</a>)</li>
      </ul><br />
      This code (mechanism, js script, etc.) also <a href="https://en.wikipedia.org/wiki/MIT_License">MIT Licensed</a>.<br />
      <br />
      <a href="https://www.pokemon.com/us/legal/">©2021 Pokémon. TM, ®Nintendo.</a> © Pokémon (...), Pokémon, Pokémon character names, (...)  are trademarks of Nintendo.
    </Col>
    <Col key="latests">
      <LatestView navigationHandler={props.navigationHandler} />
    </Col>
  </Row>;

}

export default HomeView;
