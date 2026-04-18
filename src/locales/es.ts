import type { TranslationDictionary } from './types'

const es = {
	header: {
		brand: 'Samudex',
		navigation: {
			label: 'Navegación principal',
			home: 'Inicio',
			favourites: 'Favoritos',
			random: 'Aleatorio',
		},
		language: {
			label: 'Idioma',
			options: {
				pt: 'Portugués',
				en: 'Inglés',
				es: 'Español',
				it: 'Italiano',
				ja: 'Japonés',
			},
		},
	},
	home: {
		hero: {
			eyebrow: 'Pokédex en memoria',
			title: 'Busca y pagina toda la base de Pokémon.',
			subtitle:
				'La página principal carga la lista completa una sola vez y luego hace la búsqueda y la paginación localmente por nombre o número.',
		},
		controls: {
			searchLabel: 'Buscar Pokémon',
			searchPlaceholder: 'Escribe el nombre o número del Pokémon',
			searchHint: 'La búsqueda funciona por nombre y también por el código numérico.',
			itemsPerPageLabel: 'Pokémon por página',
			totalLoadedLabel: 'Total cargado',
			filteredLabel: 'Resultados filtrados',
		},
		status: {
			loadingTitle: 'Cargando Pokémon',
			loadingDescription: 'Recuperando la lista completa para habilitar la búsqueda y la paginación en memoria.',
			errorTitle: 'No fue posible cargar la Pokédex',
			errorDescription: 'Intenta nuevamente en un momento para recuperar la lista de Pokémon.',
			emptyTitle: 'No se encontró ningún Pokémon',
			emptyDescription: 'Ajusta el término de búsqueda o reduce los filtros para encontrar resultados.',
		},
		grid: {
			openDetails: 'Abrir detalles',
			imageAlt: 'Arte oficial de {name}',
			addFavourite: 'Agregar a favoritos',
			removeFavourite: 'Quitar de favoritos',
		},
		pagination: {
			navigationLabel: 'Paginación del listado',
			previous: 'Anterior',
			next: 'Siguiente',
			summary: 'Página {current} de {total}',
		},
	},
	detailed: {
		backToHome: '\u2190 Volver al inicio',
		imageAlt: 'Arte oficial de {name}',
		addFavourite: 'Agregar a favoritos',
		removeFavourite: 'Quitar de favoritos',
		height: 'Altura',
		weight: 'Peso',
		stats: {
			title: 'Estadísticas base',
			hp: 'HP',
			attack: 'Ataque',
			defense: 'Defensa',
			specialAttack: 'Atq. Esp.',
			specialDefense: 'Def. Esp.',
			speed: 'Velocidad',
		},
		abilities: 'Habilidades',
		status: {
			loadingTitle: 'Cargando Pokémon...',
			loadingDescription: 'Obteniendo detalles de la PokeAPI.',
			errorTitle: 'Pokémon no encontrado',
			errorDescription: 'No fue posible cargar este Pokémon. Puede que no exista o que la API no esté disponible.',
		},
	},
	favourites: {
		title: 'Favoritos',
		subtitle: '{count} Pokémon guardados',
		emptyTitle: 'Sin favoritos aún',
		emptyDescription: 'Marca un Pokémon con la estrella en el listado o en su página de detalles para guardarlo aquí.',
		goHome: 'Explorar Pokémon',
	},
	notFound: {
		code: '404',
		title: 'Página no encontrada',
		description: 'La ruta que intentaste acceder no existe.',
		goHome: 'Volver al inicio',
	},
	footer: {
		github: {
			label: 'GitHub',
			ariaLabel: 'Abrir el perfil de Samu en GitHub',
			title: 'Perfil de GitHub',
		},
		pokeapi: {
			label: 'PokeAPI',
			ariaLabel: 'Abrir el sitio de PokeAPI',
			title: 'Sitio de PokeAPI',
		},
	},
} satisfies TranslationDictionary

export default es