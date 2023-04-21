/* press le like, me love number go up
  Run this command to add this as an Assyst tag on your server
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

const liveLeakJob = async (cfg) => {
	const LIVE_LEAK_IMAGE_URL = "https://github.com/meqativ.png",
		BASE_REPO_URL = "https://github.com/Meqativ/ass-yst-tags/blob/main",
		YOU = "cute";

	if (cfg?.version !== 0)
		throw new Error(
			`Version ${cfg.version} isn't available, use one of these: 0`
		);
	if (cfg?.assyst?.args === "raw") return BASE_REPO_URL + "/tags/liveleak.js";

	if (cfg?.assyst?.args === "pastebin")
		return "This tag's on github, do `<prefix>tag <name> raw`";

	if (!globalThis.ctx?.liveLeakCache?.images?.[0]) {
		// hehe
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
	const outimg = inputimg
	outimg.composite(liveleakimg, 0, 0, 0)
	return outimg.encode(cfg?.encodeLevel);
};
