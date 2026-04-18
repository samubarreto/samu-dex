import type { TranslationDictionary } from './types'

const it = {
	header: {
		brand: 'Samudex',
		navigation: {
			label: 'Navigazione principale',
			home: 'Inizio',
			favourites: 'Preferiti',
			random: 'Casuale',
		},
		language: {
			label: 'Lingua',
			options: {
				pt: 'Portoghese',
				en: 'Inglese',
				es: 'Spagnolo',
				it: 'Italiano',
				ja: 'Giapponese',
			},
		},
	},
	home: {
		hero: {
			eyebrow: 'Pokédex in memoria',
			title: 'Cerca e impagina l\'intero database dei Pokémon.',
			subtitle:
				'La Home carica l\'elenco completo una sola volta e poi gestisce ricerca e paginazione localmente per nome o numero.',
		},
		controls: {
			searchLabel: 'Cerca Pokémon',
			searchPlaceholder: 'Digita il nome o il numero del Pokémon',
			searchHint: 'La ricerca funziona per nome e anche per codice numerico.',
			itemsPerPageLabel: 'Pokémon per pagina',
			totalLoadedLabel: 'Totale caricato',
			filteredLabel: 'Risultati filtrati',
		},
		status: {
			loadingTitle: 'Caricamento Pokémon',
			loadingDescription: 'Recupero dell\'elenco completo per abilitare ricerca e paginazione in memoria.',
			errorTitle: 'Impossibile caricare la Pokédex',
			errorDescription: 'Riprova tra poco per recuperare l\'elenco dei Pokémon.',
			emptyTitle: 'Nessun Pokémon trovato',
			emptyDescription: 'Modifica il termine di ricerca o riduci i filtri per trovare risultati.',
		},
		grid: {
			openDetails: 'Apri dettagli',
			imageAlt: 'Artwork ufficiale di {name}',
			addFavourite: 'Aggiungi ai preferiti',
			removeFavourite: 'Rimuovi dai preferiti',
		},
		pagination: {
			navigationLabel: 'Paginazione elenco',
			previous: 'Precedente',
			next: 'Successiva',
			summary: 'Pagina {current} di {total}',
		},
	},
	detailed: {
		backToHome: '\u2190 Torna alla home',
		imageAlt: 'Artwork ufficiale di {name}',
		addFavourite: 'Aggiungi ai preferiti',
		removeFavourite: 'Rimuovi dai preferiti',
		height: 'Altezza',
		weight: 'Peso',
		stats: {
			title: 'Statistiche Base',
			hp: 'HP',
			attack: 'Attacco',
			defense: 'Difesa',
			specialAttack: 'Att. Sp.',
			specialDefense: 'Dif. Sp.',
			speed: 'Velocità',
		},
		abilities: 'Abilità',
		status: {
			loadingTitle: 'Caricamento Pokémon...',
			loadingDescription: 'Recupero dei dettagli dalla PokeAPI.',
			errorTitle: 'Pokémon non trovato',
			errorDescription: 'Non è stato possibile caricare questo Pokémon. Potrebbe non esistere o l\'API potrebbe non essere disponibile.',
		},
	},
	favourites: {
		title: 'Preferiti',
		subtitle: '{count} Pokémon salvati',
		emptyTitle: 'Nessun preferito',
		emptyDescription: 'Segna un Pokémon con la stella nell\'elenco o nella pagina dei dettagli per salvarlo qui.',
		goHome: 'Esplora Pokémon',
	},
	notFound: {
		code: '404',
		title: 'Pagina non trovata',
		description: 'La pagina che hai cercato di raggiungere non esiste.',
		goHome: 'Torna alla home',
	},
	footer: {
		github: {
			label: 'GitHub',
			ariaLabel: 'Apri il profilo GitHub di Samu',
			title: 'Profilo GitHub',
		},
		pokeapi: {
			label: 'PokeAPI',
			ariaLabel: 'Apri il sito di PokeAPI',
			title: 'Sito di PokeAPI',
		},
	},
} satisfies TranslationDictionary

export default it