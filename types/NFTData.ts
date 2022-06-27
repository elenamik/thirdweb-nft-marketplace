export interface NFTData {
    metadata: {
        name: string,
        description: string,
        image: string;
        external_url: string
        id: {
            'type': string
            'hex': string
        },
        uri: string
        background_color: string
        attributes: [
            {
                value: string;
                trait_type: string
            }
        ]
    }
    owner:string
}
