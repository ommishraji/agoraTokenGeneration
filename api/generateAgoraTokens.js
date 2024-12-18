const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

module.exports = async (req, res) => {
    const APP_ID = process.env.APP_ID;
    const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: "Channel name is required" });
    }

    const uid = req.query.uid || 0; // Use 0 for users with no specific UID
    const role = RtcRole.PUBLISHER;
    const expireTime = 86400; // Token expiry in seconds (24 hours)
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        role,
        privilegeExpireTime
    );

    res.status(200).json({ token });
};
