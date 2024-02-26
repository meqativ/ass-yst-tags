const defaultConfig = {
	version: 0, // number, 0
	useCustomEmojis: false,
	encodeLevel: undefined, // undefined | number // 1 - 9
	fontSize: 45, // number // 45
	font: undefined, // undefined | string //
	text: undefined, // undefined | string //
	assyst: {
		args: "", // string // {replace:"|\"|{args}}
	},
};
const emojis = {
		bad_image: "<:bad_image:1105128972364283954>",
		help: "<:questionmark:1099298038125695068>",
		help2: "<a:dumbass_think_already:1099938781504745483>",
	},
	BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
	YOU = "cute";

const sonicSaysJob = async (cfg) => {
	let stuff = message.content.match(/^(.+)? ?(tag|t) ([^ ^\n]+)/);
	return `Please upgrade this tag. You can do so by sending \`\`\`js\n${stuff[1] || ""}${stuff[2]} edit ${stuff[3]} {eval:{download:https://meqativ.github.io/assyst-tags/src/code/sonicsays.js}}\`\`\`To check who owns the tag send \`${stuff[1] || ""}${stuff[2]} info ${stuff[3]}\`and ask them to run it. If you're the admin and the owner is not available you can \`${stuff[1] || ""}${stuff[2]} delete ${stuff[3]}\` the tag and use the upgrade command  but with \`create\` instead of \`edit\``
};
