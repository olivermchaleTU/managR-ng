export class PrepareAttachment {
    uploaderId: string;
    uploadedBy: string;
    itemId: string;
    files: any;
}

export class FileMetadata {
    name: string;
    size: number;
    type: string;
}

export class PreparedAttachment {
    sasToken: string;
    files: PreparedFileMetadata;
}

export class PreparedFileMetadata {
    id: string;
    name: string;
    size: number;
    type: string;
}

export class Attachment {
    id: string;
    name: string;
    size: number;
    uploaderId: string;
    uploadedBy: string;
    uploadedOn: Date;
}
