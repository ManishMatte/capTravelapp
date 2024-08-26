namespace hpcl.srv;

using {hpcl.db as my} from '../db/schema';

service MyService {

    entity TravelRequest as projection on my.TravelRequest;
    entity HotelBooking  as projection on my.HotelBooking;
    entity BoardingPass  as projection on my.BoardingPass;
    
    
    // type GetAll {
    //     status       : String;
    //     id           : String;
    //     fileName     : String;
    //     documentType : String;
    //     created      : String;
    //     finished     : String;
    //     clientId     : String;
    // };

}

@protocol:'rest'
service attachment @(impl:'./service.js',path:'attachment'){
    @open
    type respose {};
    action   PostOCR(document : LargeString, name : String) returns respose;
    function GetOCR(ID : UUID)                              returns respose;
    function GetAllOCR()                                    returns array of respose;

}
