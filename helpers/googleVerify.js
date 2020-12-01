const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async (token) => {
    const tickt = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID
    });

    const payload = tickt.getPayload();
    const userid = payload['sub'];
    const {
        name,
        email,
        picture
    } = payload;
    return {
        name,
        email,
        picture
    };
}
module.exports = {
    googleVerify
}