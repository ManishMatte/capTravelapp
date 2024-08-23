sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("travelapp.controller.createRequest", {
        onInit: function () {

            const oModel = new sap.ui.model.json.JSONModel({
                payload :{
                    
                    "TripNumber": null,
                    "TravelType": "Deomestic",
                    "Destination": "",
                    "Country": "India",
                    "Status": "Open",
                    "TotalCost": null,
                    "TripbeginsAt": "",
                    "TripendsAt": "",
                    "SubActivity": ""
                    
                }
            });

            this.getView().setModel(oModel,"oModel");

        },
        onPressCancelRequest : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getOwnerComponent().getRouter(this).navTo("Targetworklist",{});
        },
        onPressSubmitRequest: function(){

            const that = this;

            MessageBox.alert("Do you want to save?", {
                actions: ["Submit", MessageBox.Action.CLOSE],
                emphasizedAction: "Submit",
                onClose: function (sAction) {
                    if (sAction === 'Submit') {
                        that.postTravelRequest();
                    }
                },
                dependentOn: this.getView()
            });
            
        },
        postTravelRequest: function(){
            const that = this;
            const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
            let oModel = this.getView().getModel('oModel');
            let payload = oModel.getProperty('/payload');

            $.ajax({
                url: serviceUrl + "TravelRequest",
                method: "POST",        
                data: JSON.stringify(payload),
                contentType: "application/json",
                success: function(data){

                    MessageBox.success("Request Submitted Successfully.", {
                        actions: ["Ok"],
                        emphasizedAction: "Ok",
                        onClose: function () {
                          that.getOwnerComponent().getRouter(that).navTo("Targetworklist",{});
                        },
                        dependentOn: that.getView()
                    });

                },
                error: function(errMsg) {
                    MessageBox.error("Something Went Wrong.");
                }
            });
        }
    });
});
