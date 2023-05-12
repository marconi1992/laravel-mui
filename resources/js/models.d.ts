interface Media {
    name: string;
}

interface MediaFile {
    id: number;
    file_name: string;
}

interface User {
    id: number;
    name: string;
    last_name: string;
    national_id: string;
    tax_id: string;
    phone_number: string;
    is_onboarded: boolean;
    address?: Address;
    avatar?: MediaFile;
}
