const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    ownerNumber: process.env.OWNER_NUMBER || "263710781795",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUovNlhLVjhIeEpHS29nakxjZ2dteVE5enFsOGVBTVdqT0I0Ukt3TzAxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZC82emFOSVJ2R3lCM3lYQUYvVEhnMXJaYWx5THRyd0poNTM0aWwveHZRcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TGxhZXJRVm5QK3o0ck90akZYcVlpRDQ4Vnl2RE1veFRrNnlEdmNKeVZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlVkZBQ3BLVzhwcmwzSEZCZEh3cnlSbGlxNDZSYXBuYitrTlEvRHEwUkQ0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVKQWxHSzk0OGRNR1FoVGVLWVoycTM5ZDVFRmxHclNsYjd0THIrRWRFbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitLSnZ3cWVxNHZwTTVBdWxSbVFFK3FPQVBNRUQ0U1pkSTdnMENCVFFpSEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtkUUpFWis1SExpUzVkUW5mMkJhNDBvTzNYOG1oQ0k0VUx4SWlKWmxGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjJnVHp4WXlqM1J5NTN6TldTUEpibUpqSEdtTGw5NGwxU2M3TGcralVqND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpjVEJneDdXK2l2VEJKZXBheVY3emp6dWhycC9GZGRnUVlsZy9IczRPNGwxMzQ3eTMxc01VUlFzeW1MV2orbU5KRkZ1TkFONURqT2RGb0tSaEFXcUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJOTzltZXBzM0pxUEsvVnVmanFTVDhaeXhVazMxaDBNVW83WEgzM1YxWFlJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIyMk5aTUREQyIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjcyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTk0OTAxOTYwMTczMjA6NzJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLTGt0SkFFRUlQejRjQUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0MnlIcmo1QkdGTjhFRzg1WEtLYm9sRHJKQTFQdC9IZE9IK2srT1Znd0NVPSIsImFjY291bnRTaWduYXR1cmUiOiJkaHczSVpXRjJuVTdxb21Cc0F0NEpteWdjUGJhSTBkUUNHZFJGME1qaEdXWlp0MzQ4Q2E1SHAzRlRDOFhMeUZINUNQcmtCL2s1VlBYUlA3RmVRTHVCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoib1dTMGZ3b293WXF6bEZ6NmtyUGZWNGtnTWhCeWhHQjhGV3ZxaEpnTkMvRVJESjg0cW9LMVNKNzdxOWFTMlJXS1k0QjBtay9lMWFzZGMxZGwvWWZaQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTA3ODE3OTU6NzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmRzaDY0K1FSaFRmQkJ2T1Z5aW02SlE2eVFOVDdmeDNUaC9wUGpsWU1BbCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2NDM0NDQ5LCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
