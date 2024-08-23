sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'travelreq',
            componentId: 'TravelRequestObjectPage',
            contextPath: '/TravelRequest'
        },
        CustomPageDefinitions
    );
});