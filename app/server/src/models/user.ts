import mongoose from 'mongoose';
import { PasswordManager } from '../../utils/password';



interface UserAttrs {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    googleId?: string;
    id: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
    },
    goolgId: {
        type: String,
        required: false
    },
    id: {
        type: String
    }
},
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        }
    });


userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await PasswordManager.hash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}



const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };