module.exports.config = {
    name: "updateChecktt",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "MIW.FO",
    description: "Xóa data tương tác người dùng khi out",
};

module.exports.run = async ({ event, api, Threads }) => { 
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const fs = require("fs");
    const pathA = require('path');
    const thread = require('..rm -fr modules/commands/tuongtac');
    const path = pathA.resolve(__dirname, '../', 'commands', 'cache',"data", 'checkttDay.json');
    var threadData = thread.find(i => i.threadID == event.threadID)
    const index = threadData.data.findIndex(item => item.id == event.logMessageData.leftParticipantFbId);
    threadData.data.splice(index, 1);
    fs.writeFileSync(path, JSON.stringify(thread, null, 2), 'utf-8');
}