import { createFileRoute } from "@tanstack/react-router";
import { getPokemon } from "../../services/pokemon";

export const Route = createFileRoute("/pokemon/$id")({
  component: RouteComponent,
  loader: async ({ params }) => getPokemon(params.id),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const pokemon = Route.useLoaderData();
  console.log(pokemon);
  return (
    <div>
      <h2>
        ({id}) {pokemon.name}
      </h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <dl>
        <dt>Height</dt>
        <dd>{pokemon.height}</dd>
        <dt>Weight</dt>
        <dd>{pokemon.weight}</dd>
      </dl>
    </div>
  );
}
