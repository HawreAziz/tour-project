import mongoose from 'mongoose';


interface TourAttrs {
    title: string,
    description?: string,
    name: string,
    creator: string,
    createdAt?: Date,
    tags?: [string],
    imageFile: string
    likeCount?: number
}


interface TourDoc extends mongoose.Document {
    title: string,
    description?: string,
    name: string,
    creator: string,
    createdAt?: Date,
    tags?: [string],
    imageFile: string
    likeCount: number
}

interface TourModel extends mongoose.Model<TourDoc> {
    build(attrs: TourAttrs): TourDoc;
}

const tourSchema = new mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(),
    },
    tags: [String],
    imageFile: String,
    likeCount: {
        type: Number,
        default: 0
    }
});


tourSchema.statics.build = (attrs: TourAttrs) => {
    return new Tour(attrs);
}


const Tour = mongoose.model<TourDoc, TourModel>('Tour', tourSchema);

export { Tour };