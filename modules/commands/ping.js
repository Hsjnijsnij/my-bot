module.exports.config = {
	name: "ping",
	version: "1.0.4",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toàn bộ thành viên",
	commandCategory: "Quản Lí Box",
	usages: "[Text]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args}) {
	try {
		const botID = api.getCurrentUserID();
		const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
		var body = (args.length != 0) ? args.join(" ") : "𝐷𝑎̣̂𝑦 𝑇𝑢̛𝑜̛𝑛𝑔 𝑇𝑎́𝑐 𝑁ℎ𝑎𝑛ℎ 𝐿𝑒̂𝑛 𝐶𝑜𝑛 𝐿𝑜̛̣𝑛 𝐾𝑖𝑎 𝐾ℎ𝑜̂𝑛𝑔 𝑇𝑢̛𝑜̛𝑛𝑔 𝑇𝑎́𝑐 𝐿𝑎̀ 𝐵𝑖̣ 𝐾𝑖𝑐𝑘 𝑅𝑎 𝐾ℎ𝑜̉𝑖 𝐵𝑜𝑥 𝑁ℎ𝑒́? ", mentions = [], index = 0;
		
    for(const idUser of listUserID) {

			  body = "‎" + body;
			  mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
			  index -= 1;
      
		}
    
		  return api.sendMessage({ body, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}