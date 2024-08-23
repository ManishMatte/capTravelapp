namespace hpcl.db;

using { managed, cuid } from '@sap/cds/common';

extend managed with {
    isdel : Boolean default false;
};

entity TravelRequest : managed, cuid {
    TripNumber        : Integer;
    TravelType        : String(100);
    Destination       : String(50);
    Country           : String(100);
    Status            : String(50);
    TotalCost         : Integer;
    TripbeginsAt      : Date;
    TripendsAt        : Date;
    SubActivity       : String(200);
    // Associations
    boarding          : Composition of many BoardingPass on boarding.req = $self;
    hotel             : Composition of many HotelBooking on hotel.req = $self;
}

entity BoardingPass : managed , cuid{
    passengerName     : String(50);
    flightNo          : String(30);
    flightFrom        : String(100);
    flightTo          : String(100);
    seatNo            : String(30);
    boardingDate      : DateTime;
    attachmentId      : String(50);
    // Association to TravelRequest
    req               : Association to TravelRequest;
}

entity HotelBooking : managed , cuid{
    gstState          : String(50);
    name              : String(100);
    email             : String(50);
    roomType          : String(50);
    noofGuest         : Integer;
    checkIn           : DateTime;
    checkOut          : DateTime;
    // Association to TravelRequest
    req               : Association to TravelRequest;
}
