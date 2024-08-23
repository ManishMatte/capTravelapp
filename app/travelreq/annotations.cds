using hpcl.srv.MyService as service from '../../srv/service';
annotate service.TravelRequest with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'TripNumber',
                Value : TripNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TravelType',
                Value : TravelType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Destination',
                Value : Destination,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Country',
                Value : Country,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : Status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'StartDate',
                Value : StartDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'EndDate',
                Value : EndDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TotalCost',
                Value : TotalCost,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TripbeginsAt',
                Value : TripbeginsAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TripendsAt',
                Value : TripendsAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SubActivity',
                Value : SubActivity,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'TripNumber',
            Value : TripNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'TravelType',
            Value : TravelType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Destination',
            Value : Destination,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Country',
            Value : Country,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : Status,
        }
    ],
);

