import { render, screen } from '@testing-library/react';
import App from './App';
import PokemonView from './content/Pokemon';
import getTestInput from './getTestInput';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Work if this found/i);
  expect(linkElement).toBeInTheDocument();
});

/*let randomPok = getTestInput();
for (let i in randomPok) {
  if (randomPok.hasOwnProperty(i)) {
    test('test PokemonView with '+toString(randomPok[i]), () => {
      render(<PokemonView
        pokemon={randomPok[i]}
      />);
    });
  }
}*/
