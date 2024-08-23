sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("travelapp.controller.worklist", {
        onInit: function () {
           
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Targetworklist").attachMatched(this._onObjectMatched, this);

        },
        onPressCreateTravelRequest: function(){

            //Route to Create Request Page
            this.getOwnerComponent().getRouter(this).navTo("RouteCreateRequest",{});

        },
        _onObjectMatched : function(){
            this.getView().byId("TravelRequestTableId").getBinding("items").refresh();
        },
        onRowPress: function(oEvent){
            this.getOwnerComponent().getRouter(this).navTo("RouteObject",{ID:oEvent.getSource().getBindingContext().getObject().ID}); 
        }
    });
});
