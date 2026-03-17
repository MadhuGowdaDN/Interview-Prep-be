export const jwtConfig = {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiry: '7d',
    refreshExpiry: '30d',
};