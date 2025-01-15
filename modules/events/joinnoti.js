module.exports.config = {
  name: "join",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Mirai Team",
  description: "Thông báo bot hoặc người vào nhóm",
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event,Threads }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  const data = (await Threads.getData(event.threadID)).data || {};
    const checkban = data.banOut || []
  if  (checkban.includes(checkban[0])) return
  else if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "BotMilo <3" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage(`𝐊𝐄̂́𝐓 𝐍𝐎̂́𝐈 𝐓𝐇𝐀̀𝐍𝐇 𝐂𝐎̂𝐍𝐆\n *☄️  ★ * ° .✩° 🪐｡ ✨ . ☆ •°.🌎⠀\n ${global.config.PREFIX}help để xem toàn bộ lệnh của bot <3\n*☄️  ★ * ° .✩° 🪐｡ ✨ . ☆ •°.🌎⠀\n 𝘼𝙙𝙢𝙞𝙣 𝘽𝙤𝙩: 𝑄𝑢𝑎𝑛𝑔 𝐻𝑢𝑦\n 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/RisPTG/`, threadID);
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `chao.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "[ Welcome ]\n*☄️  ★ * ° .✩° 🪐｡ ✨ . ☆ •°.🌎⠀\n Xin chào vợ {name}.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm\n Tương tác đầy đủ nếu không muốn ra đảo chơi với cá mập\n 𝘼𝙙𝙢𝙞𝙣: 𝑄𝑢𝑎𝑛𝑔 𝐻𝑢𝑦" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
}