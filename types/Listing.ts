export interface BigNumber {
    type: string,
    hex:string
}

export interface Listing {
   asset: ListingNFTData,
        assetContractAddress: string,
        buyoutPrice: BigNumber,
        'currencyContractAddress': string,
        'buyoutCurrencyValuePerToken': {
            'name': string
            'symbol': string
            'decimals': number
            'value': BigNumber
            'displayValue': '0.01'
        },
        'id': string,
        'tokenId': BigNumber,
        'quantity': BigNumber
        'startTimeInSeconds': BigNumber
        'secondsUntilEnd': BigNumber
        'sellerAddress': string
        'type': number
    }

export interface ListingNFTData {
        name: string,
        description: string,
        image: string;
        external_url: string
        id: BigNumber,
        uri: string
        background_color: string
        attributes: [
            {
                value: string;
                trait_type: string
            }
        ]
}
