import type { TranslationDictionary } from './types'

const pt = {
	header: {
		brand: 'Samudex',
		navigation: {
			label: 'Navegação principal',
			home: 'Início',
			favourites: 'Favoritos',
			random: 'Aleatório',
		},
		language: {
			label: 'Idioma',
			options: {
				pt: 'Português',
				en: 'Inglês',
				es: 'Espanhol',
				it: 'Italiano',
				ja: 'Japonês',
			},
		},
	},
	home: {
		hero: {
			eyebrow: 'Pokédex em memória',
			title: 'Busque e pagine toda a base de Pokémon.',
			subtitle:
				'A Home carrega a listagem completa uma única vez e depois faz busca e paginação localmente por nome ou código.',
		},
		controls: {
			searchLabel: 'Buscar Pokémon',
			searchPlaceholder: 'Digite o nome ou número do Pokémon',
			searchHint: 'A busca funciona por nome e também pelo código numérico.',
			itemsPerPageLabel: 'Pokémon por página',
			totalLoadedLabel: 'Total carregado',
			filteredLabel: 'Resultados filtrados',
		},
		status: {
			loadingTitle: 'Carregando Pokémon',
			loadingDescription: 'Buscando a lista completa para habilitar busca e paginação em memória.',
			errorTitle: 'Não foi possível carregar a Pokédex',
			errorDescription: 'Tente novamente em instantes para recuperar a lista de Pokémon.',
			emptyTitle: 'Nenhum Pokémon encontrado',
			emptyDescription: 'Ajuste o termo da busca ou reduza os filtros para encontrar resultados.',
		},
		grid: {
			openDetails: 'Abrir detalhes',
			imageAlt: 'Arte oficial de {name}',
			addFavourite: 'Adicionar aos favoritos',
			removeFavourite: 'Remover dos favoritos',
		},
		pagination: {
			navigationLabel: 'Paginação da listagem',
			previous: 'Anterior',
			next: 'Próxima',
			summary: 'Página {current} de {total}',
		},
	},
	detailed: {
		backToHome: '\u2190 Voltar ao início',
		imageAlt: 'Arte oficial de {name}',
		addFavourite: 'Adicionar aos favoritos',
		removeFavourite: 'Remover dos favoritos',
		height: 'Altura',
		weight: 'Peso',
		stats: {
			title: 'Estatísticas Base',
			hp: 'HP',
			attack: 'Ataque',
			defense: 'Defesa',
			specialAttack: 'Atq. Esp.',
			specialDefense: 'Def. Esp.',
			speed: 'Velocidade',
		},
		abilities: 'Habilidades',
		status: {
			loadingTitle: 'Carregando Pokémon...',
			loadingDescription: 'Buscando detalhes na PokeAPI.',
			errorTitle: 'Pokémon não encontrado',
			errorDescription: 'Não foi possível carregar este Pokémon. Ele pode não existir ou a API pode estar indisponível.',
		},
	},
	favourites: {
		title: 'Favoritos',
		subtitle: '{count} Pokémon salvos',
		emptyTitle: 'Nenhum favorito ainda',
		emptyDescription: 'Marque um Pokémon com a estrela na listagem ou na página de detalhes para salvá-lo aqui.',
		goHome: 'Explorar Pokémon',
	},
	notFound: {
		code: '404',
		title: 'Página não encontrada',
		description: 'A rota que você tentou acessar não existe.',
		goHome: 'Voltar ao início',
	},
	footer: {
		github: {
			label: 'GitHub',
			ariaLabel: 'Abrir perfil do Samu no GitHub',
			title: 'Perfil do GitHub',
		},
		pokeapi: {
			label: 'PokeAPI',
			ariaLabel: 'Abrir site da PokeAPI',
			title: 'Site da PokeAPI',
		},
	},
} satisfies TranslationDictionary

export default pt