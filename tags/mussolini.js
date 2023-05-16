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
};

const sonicSaysJob = async (cfg) => {
	if (!cfg) cfg = {};
	if (cfg?.version !== 0)
		throw new Error(
			`Version ${cfg.version} isn't available, use one of these: 0`
		);
	const mussoliniImag = await fetch("https://upload.wikimedia.org/wikipedia/commons/e/ea/Palazzo_Brascjo_Fascist_Poster%2C_1934.png").then(res => res.arrayBuffer()).then(ImageScript.decode)
	const lastImag = await fetch(cfg?.assyst?.lastattachment).then(res => res.arrayBuffer()).then(ImageScript.decode)
	return lastImag.encode()
};
