import React from 'react';
import {FormControl} from 'react-bootstrap';

import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/menu.css';
import 'jquery-ui/themes/base/autocomplete.css';

//require('jquery-ui/ui/core');
const $ = jQuery;
require('jquery-ui/ui/core');
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/autocomplete');

const pokemonAPI = require('../pokemonAPI.js');

class SearchInput extends React.Component {

  componentDidMount() {
    this.$el = $(this.el);
    let searchHandler = this.props.onSubmit;
    this.$el.autocomplete({
      source: new pokemonAPI().getPokemonNames(),
      select: function(event, ui) {
            event.target.value = ui.item.value;
            searchHandler(event);
          }
    });
  }

  componentWillUnmout() {
    this.$el.autocomplete('destroy');
  }

  render() {
    return <FormControl
      key={this.props.value}
      type="text"
      placeholder="Type Pokemon Name or id"
      className="me-2"
      aria-label="Search"
      name="pokemonName"
      id="pokemonSearch"
      autoComplete="off"
      defaultValue={this.props.defaultValue}
      form="searchForm"
      ref={el => this.el = el}
    />;
  }

}

export default SearchInput;
