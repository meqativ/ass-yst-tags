
// MOST OF THE CODE IS TAKEN A VENDETTA PLUGIN,
// https://github.com/mugman174/vendetta-plugins/blob/main/plugins/urban/src/urban.js


const defaultConfig = {
	version: 0, // number, 0
	newlineLimit: 20,
	assyst: {
		args: "", // string // {replace:"|\"|{args}}
	},
};

const urbanJob = (config) => {
	const BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
		YOU = "cute"
	if (config?.assyst?.args === "raw") return BASE_REPO_URL+"/urban.js"

	const xml = (text) => "```xml\n" + text + "```";
	const helpText = (name, end = "") =>
		xml(`< ${name} >`) +
		`<:questionmark:1099298038125695068>\`-t urban [sentence]\`` +
		end;



	const args = {
		inline_links: false,  // boolean
		word: config?.assyst?.args,      // string
	}
	if (config?.assyst?.args?.length < 1) return helpText("No sentence provided");
	const { word, inline_links } = args;

	const query = encodeURIComponent(args.word);
	const url = `https://api.urbandictionary.com/v0/define?term=${query}`;
	const response = await fetch(url),
		data = await response.json();
		if (!definition) {
			return helpText(`No definition found for \`${word.replaceAll("`", "`󠄴")}\`${response.status !== 200 ? ` (${response.status})` : ""}`);
		}
		
	const permalink = defObj.permalink;
		let output = `__Definition for **\`${defObj.word}\`**__`;
		
		if (!inline_links) {
			output += `\n${quote(definition)}\n\n` +
			`Source: <${permalink}>`;
		} else {
			output += ` ([source](${permalink} "Link to the place where the definition was found"))\n` +
			`${quote(replaceHighlighted(definition))}`;
		}
	return output
}
function quote(text) {
	return `> ${text.replaceAll("\n", "\n> ")}`
}
function replaceHighlighted(text) {
	return text.replace(
		/\[(.*?)\]/g,
		(match, word) => {
			word = word.trim();
			return `[${word}](<https://www.urbandictionary.com/define.php?term=${encodeURIComponent(word)}> "Definition for “${word}”")`
		}
	);
}
