const defaultConfig = {
	version: 0, // number, 0
	newlineLimit: 20,
	assyst: {
		args: "", // string // {replace:"|\"|{args}}
	},
};

const run = (args) =>
	repeatJob({
		...defaultConfig,
		assyst: { ...defaultConfig.assyst, args },
	});

const repeatJob = (config) => {
	const BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
		YOU = "cute"
	if (config?.assyst?.args === "raw") return BASE_REPO_URL+"/tags/repeat.js"

	const xml = (text) => "```xml\n" + text + "```";
	const helpText = (name, end = "") =>
		xml(`< ${name} >`) +
		`<:questionmark:1099298038125695068>\`-t repeat [repeat<number>] [?text...<string>]\`` +
		end;

	if (!config?.assyst?.args?.length)
		return helpText(
			"hewp",
			"\nIf the tag malfunctions, tell <@744276454946242723>, or the owner of the tag(`<prefix>tag info {name}`)."
		);
	const args = config.assyst.args.split(" ");
	const timesToRepeat = parseInt(args.shift());
	const fnc = ($) =>
			$ === 0 || $ < 1
			? 1 : 
			$ > 2000 
			? 2 : 0;
	const shit = fnc(timesToRepeat);
	if (shit !== 0)
		return helpText(
			"Invalid number [arg:1]"+
			shit !== 0 ?
			(" (should be " +
					shit === 1
					? "more than 1"
					: shit === 3
					? "less than 2000" : shit +
				")") : ""
		);
	const text = args.join(" ");
	if (!text) return helpText(`No text [arg:2…]`)
	if (text.length == 0) return String(timesToRepeat).repeat(timesToRepeat);
	const outputReal = text.repeat(timesToRepeat);
	if (outputReal.split("\n").length > config?.newlineLimit)
		return helpText(`Too many newlines. [MAX:${config?.newlineLimit}]`);

	return outputReal.trim().length === 0
		? helpText("empty output")
		: outputReal.substring(0, 2000);
};
