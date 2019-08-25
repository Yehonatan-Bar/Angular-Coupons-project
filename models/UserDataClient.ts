export class UserDataClient {
    public constructor(
        public id: number,
        public clientType: string,
        public token: number,
        public companyID?: number,

    ) { }

}
