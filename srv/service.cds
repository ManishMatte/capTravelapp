namespace hpcl.srv;

using {hpcl.db as my} from '../db/schema';

service MyService {

    entity TravelRequest as projection on my.TravelRequest;
    entity HotelBooking  as projection on my.HotelBooking;
    entity BoardingPass  as projection on my.BoardingPass;
    action   PostOCR(document : LargeBinary, name : String) returns {};
    function GetOCR(ID : UUID)                              returns {};
    function GetAllOCR()                                    returns array of {};

}
