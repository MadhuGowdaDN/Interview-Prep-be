export const cookieConfig = {

    accessToken: {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 15 * 60 * 1000,
    },

    refreshToken: {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },

};