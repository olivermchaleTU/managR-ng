export class CreateComment {
    agileItemId: string;
    commenterId: string;
    comment: string;
}

export class ItemComment {
    id: string;
    commenterId: string;
    commenterName: string;
    comment: string;
    createdAt: Date;
    isActive: boolean
}
