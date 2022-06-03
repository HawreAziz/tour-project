import * as bcrypt from 'bcrypt';


export class PasswordManager {
    static async hash(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    static async compare(plainPassword: string, encryptedPassword: string) {
        return await bcrypt.compare(plainPassword, encryptedPassword);
    }
}