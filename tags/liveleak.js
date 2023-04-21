/* Run this command to add this as an Assyst tag on your server
=====
<prefix>tag create liveleak {js: 
{download: https://github.com/Meqativ/ass-yst-tags/raw/main/tags/liveleak.js }
liveLeakJob(\{...defaultConfig, assyst:\{lastattachment: "{lastattachment}", args: "{replace:"|\"|{args}}"\}\}) 
}
=====
Then you can use <prefix>tag liveleak [image]
  */

const defaultConfig = {
	version: 0, // number, 0
	encodeLevel: undefined, // undefined | number // 1 - 9
	font: undefined, // undefined | string //
	text: undefined, // undefined | string //
	assyst: {
		args: "", // string // {replace:"|\"|{args}}
		lastattachment: "meow", // string // {lastattachment}
	},
};
const help = {
	arg1:
		"`[vertical: top/middle/bottom]`-`[horisontal: left/middle/right]`\n" +
		"Examples: top-left; middle-middle; bottom-right; top-right",
};
const liveLeakJob = async (cfg) => {
	const LIVE_LEAK_IMAGE_URL =
			"https://cdn.discordapp.com/attachments/824020889234440232/1099053961211822100/attachment.png",
		BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
		YOU = "cute";

	if (cfg?.version !== 0)
		throw new Error(
			`Version ${cfg.version} isn't available, use one of these: 0`
		);
	if (cfg?.assyst?.args === "raw") return BASE_REPO_URL + "/tags/liveleak.js";

	if (cfg?.assyst?.args === "pastebin")
		return "This tag is on github, do `<prefix>tag <name> raw`";

	const args = cfg?.assyst?.args?.split(/ +/g);

	if (args[0] && !args[0].includes("-")) return "Invalid position in first argument.\n" + help.arg1;

	if (ctx?.flushCache || !globalThis.ctx?.liveLeakCache?.images?.[0]) {
		globalThis.ctx.liveLeakCache = {
			images: [await fetch(LIVE_LEAK_IMAGE_URL).then((a) => a.arrayBuffer())],
		};
	}
	globalThis.ctx.liveLeakCache.images[1] = await fetch(
		cfg.assyst.lastattachment
	).then((res) => res.arrayBuffer());

	const [liveleakimg, inputimg] = await Promise.all(
		globalThis.ctx.liveLeakCache.images.map(ImageScript.decode)
	);

	const inputpos = args[0]?.split("-") || ["top", "left"];
	// top  |  left
	// middle |  middle
	// bottom  |  right
	const position = [1, 1];

	if (inputimg.height !== 1 && inputimg.width !== 1) {
		if (inputpos[0] === "top") position[0] = 1;
		else if (inputpos[0] === "middle")
			position[0] = Math.round(inputimg.height / 2 - liveleakimg.width);
		else if (inputpos[0] === "bottom")
			position[0] = inputimg.height - liveleakimg.height;
		else {
			return (
				`Invalid vertical in first argument (received: ${inputpos[0]})\n` +
				help.arg1
			);
		}

		if (inputpos[1] === "left") position[0] = 1;
		else if (inputpos[1] === "middle")
			position[1] = Math.round(inputimg.width / 2 - liveleakimg.width);
		else if (inputpos[1] === "right")
			position[1] = inputimg.width - liveleakimg.width;
		else {
			return (
				`Invalid horisontal in first argument (received: ${inputpos[1]})\n` +
				help.arg1
			);
		}
	}

	const outimg = inputimg;
	outimg.composite(liveleakimg, position[0], position[1], 0);
	return outimg.encode(cfg?.encodeLevel);
};
