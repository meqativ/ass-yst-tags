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

const repeatJob = (cfg) => {
	const BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
		YOU = "cute"
	if (cfg?.assyst?.args === "raw") return BASE_REPO_URL+"/repeat.js"

	const xml = (text) => "```xml\n" + text + "```";
	const helpText = (name, end = "") =>
		xml(`< ${name} >`) +
		`:questionmark:\`-t repeat [repeat<number>] [?text...<string>]\`` +
		end;

	if (cfg?.assyst?.args?.length === 0)
		return helpText(
			"hewp",
			"\nIf the tag malfunctions, talk to <@744276454946242723>, or the owner of the tag(<prefix>tag info {name})."
		);
	const args = rawArgs.split(" ");
	const timesToRepeat = parseInt(args.shift());
	const fnc = ($) =>
		Number.isNaN($) ? 1 : a === 0 || a < 1 ? 2 : a > 2000 ? 3 : 0;
	const shit = fnc(timesToRepeat);
	if (shit !== 0)
		return helpText(
			"first argument is invalid (should be " +
				(shit === 1
					? "a number"
					: shit === 2
					? "more than 1"
					: shit === 3
					? "less than 2000"
					: "idk, think?") +
				")"
		);
	const text = args.join(" ");
	if (text.length == 0) return String(timesToRepeat).repeat(timesToRepeat);
	const outputReal = text.repeat(timesToRepeat);
	if (outputReal.split("\n").length > cfg?.newlineLimit)
		return helpText(`too many newlines. MAX: ${cfg?.newlineLimit}`);

	return outputReal.trim().length === 0
		? helpText("empty output")
		: outputReal.substring(0, 2000);
};
