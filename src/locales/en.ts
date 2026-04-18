import type { TranslationDictionary } from './types'

const en = {
	header: {
		brand: 'Samudex',
		navigation: {
			label: 'Main navigation',
			home: 'Home',
			favourites: 'Favorites',
			random: 'Random',
		},
		language: {
			label: 'Language',
			options: {
				pt: 'Portuguese',
				en: 'English',
				es: 'Spanish',
				it: 'Italian',
				ja: 'Japanese',
			},
		},
	},
	home: {
		hero: {
			eyebrow: 'In-memory Pokédex',
			title: 'Search and paginate the entire Pokémon database.',
			subtitle:
				'The Home page loads the full list once and then handles filtering and pagination locally by name or number.',
		},
		controls: {
			searchLabel: 'Search Pokémon',
			searchPlaceholder: 'Type a Pokémon name or number',
			searchHint: 'Search works by name and also by the numeric code.',
			itemsPerPageLabel: 'Pokémon per page',
			totalLoadedLabel: 'Total loaded',
			filteredLabel: 'Filtered results',
		},
		status: {
			loadingTitle: 'Loading Pokémon',
			loadingDescription: 'Fetching the full list to enable in-memory search and pagination.',
			errorTitle: 'Could not load the Pokédex',
			errorDescription: 'Try again shortly to recover the Pokémon list.',
			emptyTitle: 'No Pokémon found',
			emptyDescription: 'Adjust the search term or reduce the filters to find results.',
		},
		grid: {
			openDetails: 'Open details',
			imageAlt: 'Official artwork of {name}',
			addFavourite: 'Add to favorites',
			removeFavourite: 'Remove from favorites',
		},
		pagination: {
			navigationLabel: 'Listing pagination',
			previous: 'Previous',
			next: 'Next',
			summary: 'Page {current} of {total}',
		},
	},
	detailed: {
		backToHome: '\u2190 Back to home',
		imageAlt: 'Official artwork of {name}',
		addFavourite: 'Add to favorites',
		removeFavourite: 'Remove from favorites',
		height: 'Height',
		weight: 'Weight',
		stats: {
			title: 'Base Stats',
			hp: 'HP',
			attack: 'Attack',
			defense: 'Defense',
			specialAttack: 'Sp. Atk',
			specialDefense: 'Sp. Def',
			speed: 'Speed',
		},
		abilities: 'Abilities',
		status: {
			loadingTitle: 'Loading Pokémon...',
			loadingDescription: 'Fetching details from the PokeAPI.',
			errorTitle: 'Pokémon not found',
			errorDescription: 'We could not load this Pokémon. It may not exist or the API may be unavailable.',
		},
	},
	favourites: {
		title: 'Favorites',
		subtitle: '{count} Pokémon saved',
		emptyTitle: 'No favorites yet',
		emptyDescription: 'Star a Pokémon from the listing or from its detail page to save it here.',
		goHome: 'Browse Pokémon',
	},
	notFound: {
		code: '404',
		title: 'Page not found',
		description: 'The route you tried to access does not exist.',
		goHome: 'Back to home',
	},
	footer: {
		github: {
			label: 'GitHub',
			ariaLabel: "Open Samu's GitHub profile",
			title: 'GitHub profile',
		},
		pokeapi: {
			label: 'PokeAPI',
			ariaLabel: 'Open the PokeAPI website',
			title: 'PokeAPI website',
		},
	},
} satisfies TranslationDictionary

export default en