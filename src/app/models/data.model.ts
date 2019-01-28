export interface Data {
    gender?: string;
    name?: {
        title?: string;
        first?: string;
        last?: string;
    };
    location?: {
        street?: string;
        city?: string;
        state?: string;
        postcode?: string;
        coordinates: {
            latitude?: string;
            longitude?: string;
        };
        timezone: {
            offset?: string;
            description?: string;
        };
    }
    email?: string;
    login?: {
        uuid?: string;
        username?: string;
        password?: string;
        salt?: string;
        md5?: string;
        sha1?: string;
        sha256?: string;
    },
    dob?: {
        date?: string;
        age?: Number;
    },
    registered?: {
        date?: string;
        age?: Number
    },
    phone?: string;
    cell?: string;
    id?: {
        name?: string;
        value?: Number;
    },
    picture?: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    },
    nat?: string;
    estado?: string;
}
