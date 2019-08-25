

export class Coupon {
    public constructor(
        public couponID?:number,
        public companyID?: number,
        public title?: string,
        public startDate?: Date,
        public endDate?: Date,
        public amount? :string,
        public category?:string,
        public description?:string,
        public price?:number,
        public image?:string,
        public custPhone?:number,
    ){}
    
    

}



// public constructor( public companyId? : number, 
//     public id? : number, 
//     public category? : string,
//     public title? : string, 
//     public description? : string,
//     public startDate? : Date, 
//     public endDate? : Date,
//     public amount? : number, 
//     public price? : number,
//     public image? : string,
//     )
// {     
// }
// }