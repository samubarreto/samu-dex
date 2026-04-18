import type { TranslationDictionary } from './types'

const ja = {
	header: {
		brand: 'Samudex',
		navigation: {
			label: 'メインナビゲーション',
			home: 'ホーム',
			favourites: 'お気に入り',
			random: 'ランダム',
		},
		language: {
			label: '言語',
			options: {
				pt: 'ポルトガル語',
				en: '英語',
				es: 'スペイン語',
				it: 'イタリア語',
				ja: '日本語',
			},
		},
	},
	home: {
		hero: {
			eyebrow: 'メモリ内ポケデックス',
			title: 'すべてのポケモンを検索してページ分割できます。',
			subtitle:
				'ホームでは一覧を一度だけ読み込み、その後は名前や番号でローカル検索とページ分割を行います。',
		},
		controls: {
			searchLabel: 'ポケモンを検索',
			searchPlaceholder: 'ポケモンの名前または番号を入力',
			searchHint: '名前でも番号でも検索できます。',
			itemsPerPageLabel: '1ページの件数',
			totalLoadedLabel: '読み込み総数',
			filteredLabel: '絞り込み結果',
		},
		status: {
			loadingTitle: 'ポケモンを読み込み中',
			loadingDescription: 'ローカル検索とページ分割のために一覧全体を取得しています。',
			errorTitle: 'ポケデックスを読み込めませんでした',
			errorDescription: 'しばらくしてから再試行すると一覧を取得できる場合があります。',
			emptyTitle: 'ポケモンが見つかりません',
			emptyDescription: '検索語を変更するか条件を減らして結果を探してください。',
		},
		grid: {
			openDetails: '詳細を開く',
			imageAlt: '{name}の公式アート',
			addFavourite: 'お気に入りに追加',
			removeFavourite: 'お気に入りから削除',
		},
		pagination: {
			navigationLabel: '一覧のページ移動',
			previous: '前へ',
			next: '次へ',
			summary: '{current} / {total} ページ',
		},
	},
	detailed: {
		backToHome: '← ホームに戻る',
		imageAlt: '{name}の公式アート',
		addFavourite: 'お気に入りに追加',
		removeFavourite: 'お気に入りから削除',
		height: '高さ',
		weight: '重さ',
		stats: {
			title: '基本ステータス',
			hp: 'HP',
			attack: 'こうげき',
			defense: 'ぼうぎょ',
			specialAttack: 'とくこう',
			specialDefense: 'とくぼう',
			speed: 'すばやさ',
		},
		abilities: '特性',
		status: {
			loadingTitle: 'ポケモンを読み込み中...',
			loadingDescription: 'PokeAPIから詳細を取得しています。',
			errorTitle: 'ポケモンが見つかりません',
			errorDescription: 'このポケモンを読み込めませんでした。存在しないかAPIが利用できない可能性があります。',
		},
	},
	favourites: {
		title: 'お気に入り',
		subtitle: '{count}匹のポケモンを保存',
		emptyTitle: 'お気に入りはまだありません',
		emptyDescription: '一覧や詳細ページでポケモンに星を付けるとここに保存されます。',
		goHome: 'ポケモンを探す',
	},
	notFound: {
		code: '404',
		title: 'ページが見つかりません',
		description: 'アクセスしようとしたルートは存在しません。',
		goHome: 'ホームに戻る',
	},
	footer: {
		github: {
			label: 'GitHub',
			ariaLabel: 'SamuのGitHubプロフィールを開く',
			title: 'GitHubプロフィール',
		},
		pokeapi: {
			label: 'PokeAPI',
			ariaLabel: 'PokeAPIのサイトを開く',
			title: 'PokeAPIサイト',
		},
	},
} satisfies TranslationDictionary

export default ja