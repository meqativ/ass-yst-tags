/* Add this as a tag on your server
-t create connections {js:
{download:https://github.com/Meqativ/ass-yst-tags/raw/main/tags/connections.js?update={js:+Date.now()}}
connectionsJob(\{...defaultConfig\});
}
*/
const getAvailableConnections = () =>
	fetch("https://canary.discord.com/api/v9/connections/meoww/authorize")
		.then((res) => res.json())
		.then((json) => json.errors.provider_id._errors[0].message.match(/(?<=')[\w-]+(?=')/g).sort());

const BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
	YOU = "cute",
	TAG_PREFIX = message.content.replace(args.join(""), "");
const defaultConfig = {
	version: 0, // number, 0
	assyst: {
		args: undefined, // undefined (uses the constant) | string // {replace:"|\"|{args}}
	},
};
const emojis = {
	bad_image: "<:bad_image:1105128972364283954>",
	help: "<:questionmark:1099298038125695068>",
	help2: "<a:dumbass_think_already:1099938781504745483>",
};

const connectionsJob = async (cfg) => {
	if (cfg === undefined) cfg = {};
	const _args = args;
	let args = _args ?? undefined;
	if (typeof cfg?.assyst?.args === "string") args = cfg.assyst.args.split(" ");
	if (typeof args !== "string") throw new Error("No args");
	if (config?.assyst?.args === "raw") return BASE_REPO_URL + "/tags/connections.js";
	args[0] = args[0].toLowerCase();

	if (args[0] === "services") return getAvailableConnections().then((arr) => `The available services are:\n1. \`${arr.join("\n1.")}\`.`);

	if (args[0] === "snippet") {
		const connections = await getAvailableConnections();
		let service;
		let isValid;
		if (args[1]) isValid = connections.includes(args[1]);
		if (isValid) service = args[1];
		return (
			`\`\`\`js\nconst service = "${service || "SERVICE_HERE"}";${
				isValid === true ? "" : `  // ${isValid === false ? `${args[1]} isn't a valid service, do ` : ""}\"${TAG_PREFIX} connections services\" for a list of available services`
			}\n` + "(await (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m => m?.exports?.Z?.authorize).exports.Z.authorize(service)).body.url```"
		);
	}
	return (
		`0. Open https://discord.com/app in a browser(preferably chrome), and go into the devtools console by pressing \`Ctrl + Option + J\` ||[Option is the windows key, or ⌘ on mac]||\n` +
		`1. Do "${TAG_PREFIX} snippet" and copy the snippet into the console text input\n` +
		`2. Fill in the blanks ("SERVICE_HERE"), or add the wanted connection as the argument to the snippet subcommand\n` +
		`3. Press enter\n` +
		`4. Go to the link and follow the steps on there\n` +
		`5. 🎉`
	);
};

const run = (rawArgs) => connectionsJob({ assyst: { args: rawArgs } });
