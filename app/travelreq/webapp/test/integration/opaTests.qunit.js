sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'travelreq/test/integration/FirstJourney',
		'travelreq/test/integration/pages/TravelRequestList',
		'travelreq/test/integration/pages/TravelRequestObjectPage'
    ],
    function(JourneyRunner, opaJourney, TravelRequestList, TravelRequestObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('travelreq') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTravelRequestList: TravelRequestList,
					onTheTravelRequestObjectPage: TravelRequestObjectPage
                }
            },
            opaJourney.run
        );
    }
);