sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("travelapp.controller.worklist", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteObject").attachMatched(this._onObjectMatched, this);

                const oModel = new sap.ui.model.json.JSONModel({
                    payload: {
                        BoardingPass: []
                    },
                    editFlag: false,
                    BoardingPass: {
                        passengerName: "",
                        flightNo: "",
                        flightFrom: "",
                        flightTo: "",
                        seatNo: "",
                        boardingDate: "",
                        attachmentId: "",
                        req_ID: ""
                    },
                    HotelBooking: {
                        gstState: "",
                        name: "",
                        email: "",
                        roomType: "",
                        noofGuest: "",
                        checkIn: "",
                        checkOut: "",
                        req_ID: ""
                    },
                    items: []
                })

                this.getView().setModel(oModel, 'oModel');

            },
            onPressCreateTravelRequest: function () {

                //Route to Create Request Page
                this.getOwnerComponent().getRouter(this).navTo("RouteCreateRequest", {});

            },
            _onObjectMatched: function () {
                this.getView().byId("TravelRequestTableId").getBinding("items").refresh();
            },
            onRowPress: function (oEvent) {
                this.getOwnerComponent().getRouter(this).navTo("RouteObject", { ID: oEvent.getSource().getBindingContext().getObject().ID });
            },
            onPressEdit: function () {

                this.getView().getModel('oModel').setProperty('/editFlag', true);

            },
            onPressSave: function () {
                this.getView().getModel('oModel').setProperty('/editFlag', false);
            },
            _onObjectMatched: function (oEvent) {

                const that = this;
                const ID = oEvent.getParameter("arguments").ID;
                const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();

                // get the data of ID

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: serviceUrl + 'TravelRequest(' + ID + ')?$expand=hotel,boarding',
                    success: function (response, statusText, xhrToken) {

                        that.getView().getModel("oModel").setProperty('/payload', response);

                    },
                    error: function (xhrToken, statusText, error) {
                        console.log('Error is - ' + error.toString());
                    }
                });

            },
            onPressCreateFlightDetails: function () {
                if (!this.oCreateFlight) {
                    this.oCreateFlight = sap.ui.xmlfragment(
                        "travelapp.view.createFlight",
                        this
                    );
                }
                this.getView().addDependent(this.oCreateFlight);
                this.oCreateFlight.open();
            },
            onPressCreateHotelDetails: function () {
                if (!this.createHotel) {
                    this.createHotel = sap.ui.xmlfragment(
                        "travelapp.view.createHotel",
                        this
                    );
                }
                this.getView().addDependent(this.createHotel);
                this.createHotel.open();
            },
            onPressCancelFlightDetails: function () {
                if (!this.oCreateFlight) {
                    this.oCreateFlight = sap.ui.xmlfragment(
                        "travelapp.view.createFlight",
                        this
                    );
                }
                this.getView().addDependent(this.oCreateFlight);
                this.oCreateFlight.close();

                this.getView().getModel('oModel').setProperty('/BoardingPass', {
                    passengerName: "",
                    flightNo: "",
                    flightFrom: "",
                    flightTo: "",
                    seatNo: "",
                    boardingDate: "",
                    attachmentId: "",
                    req_ID: ""
                });

            },
            onPressCancelHotelDetails: function () {
                if (!this.createHotel) {
                    this.createHotel = sap.ui.xmlfragment(
                        "travelapp.view.createHotel",
                        this
                    );
                }
                this.getView().addDependent(this.createHotel);
                this.createHotel.close();

                this.getView().getModel('oModel').setProperty('/HotelBooking', {
                    gstState: "",
                    name: "",
                    email: "",
                    roomType: "",
                    noofGuest: "",
                    checkIn: "",
                    checkOut: "",
                    req_ID: ""
                });

            },
            onPressSaveFlightDetails: function () {
                const that = this;
                const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
                let oModel = this.getView().getModel('oModel');
                let payload = oModel.getProperty('/BoardingPass');
                payload.req_ID = oModel.getProperty('/payload/ID');

                if (payload.ID !== undefined && payload.ID !== null && payload.ID !== '') {

                    $.ajax({
                        url: serviceUrl + `BoardingPass(${payload.ID})`,
                        method: "PUT",
                        data: JSON.stringify(payload),
                        contentType: "application/json",
                        success: function (data) {

                            MessageBox.success("Flight Details Saved Successfully.", {
                                actions: ["Ok"],
                                emphasizedAction: "Ok",
                                onClose: function () {
                                    that.refreshObjectModel('flight', payload.req_ID);
                                },
                                dependentOn: that.getView()
                            });

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                } else {

                    $.ajax({
                        url: serviceUrl + "BoardingPass",
                        method: "POST",
                        data: JSON.stringify(payload),
                        contentType: "application/json",
                        success: function (data) {

                            MessageBox.success("Flight Details Saved Successfully.", {
                                actions: ["Ok"],
                                emphasizedAction: "Ok",
                                onClose: function () {
                                    that.refreshObjectModel('flight', payload.req_ID);
                                },
                                dependentOn: that.getView()
                            });

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                }
                that.onPressCancelFlightDetails();
            },
            onPressSaveHotelDetails: function () {
                const that = this;
                const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
                let oModel = this.getView().getModel('oModel');
                let payload = oModel.getProperty('/HotelBooking');
                payload.noofGuest = Number(payload.noofGuest);
                payload.req_ID = oModel.getProperty('/payload/ID');

                if (payload.ID !== undefined && payload.ID !== null && payload.ID !== '') {

                    $.ajax({

                        url: serviceUrl + `HotelBooking(${payload.ID})`,
                        method: "PUT",
                        data: JSON.stringify(payload),
                        contentType: "application/json",
                        success: function (data) {

                            MessageBox.success("Hotel Details Saved Successfully.", {
                                actions: ["Ok"],
                                emphasizedAction: "Ok",
                                onClose: function () {
                                    that.refreshObjectModel('hotel', payload.req_ID);
                                },
                                dependentOn: that.getView()
                            });

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                } else {

                    $.ajax({
                        url: serviceUrl + "HotelBooking",
                        method: "POST",
                        data: JSON.stringify(payload),
                        contentType: "application/json",
                        success: function (data) {

                            MessageBox.success("Hotel Details Saved Successfully.", {
                                actions: ["Ok"],
                                emphasizedAction: "Ok",
                                onClose: function () {
                                    that.refreshObjectModel('hotel', payload.req_ID);
                                },
                                dependentOn: that.getView()
                            });

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });
                }
                that.onPressCancelHotelDetails();
            },
            refreshObjectModel: function (value, ID) {

                const that = this;
                const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();

                if (value === 'all' || value === 'flight') {

                    $.ajax({
                        url: serviceUrl + `BoardingPass?$filter=req_ID eq ${ID}`,
                        method: "GET",
                        success: function (response, statusText, xhrToken) {

                            that.getView().getModel('oModel').setProperty('/payload/boarding', response.value)

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                }

                if (value === 'all' || value === 'hotel') {

                    $.ajax({
                        url: serviceUrl + `HotelBooking?$filter=req_ID eq ${ID}`,
                        method: "GET",
                        success: function (response, statusText, xhrToken) {

                            that.getView().getModel('oModel').setProperty('/payload/hotel', response.value)

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                }

            },
            onPressHotelDetailsRow: function (oEvent) {
                const oModel = this.getView().getModel('oModel');
                oModel.setProperty('/HotelBooking', oEvent.getSource().getBindingContext('oModel').getObject());
                oModel.setProperty('/HotelBooking/checkIn', new Date(oModel.getProperty('/HotelBooking/checkIn')));
                oModel.setProperty('/HotelBooking/checkOut', new Date(oModel.getProperty('/HotelBooking/checkOut')));

                //to open the Hotel Details Fragment
                this.onPressCreateHotelDetails();
            },
            onPressFlightDetailsRow: function (oEvent) {
                const oModel = this.getView().getModel('oModel');
                oModel.setProperty('/BoardingPass', oEvent.getSource().getBindingContext('oModel').getObject());
                oModel.setProperty('/BoardingPass/boardingDate', new Date(oModel.getProperty('/BoardingPass/boardingDate')));

                //to open the Hotel Details Fragment
                this.onPressCreateFlightDetails();
            },
            formateToDate: function (value) {
                return new Date(value);
            },
            onPressUploadFlightDetails: function () {

                if (!this.oUploadFlight) {
                    this.oUploadFlight = sap.ui.xmlfragment(
                        "travelapp.view.uploadFlight",
                        this
                    );
                }
                this.getView().addDependent(this.oUploadFlight);
                this.oUploadFlight.open();

            },
            onPressSaveUploadFlight: function () {
                const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
                const uploadSet = sap.ui.getCore().byId('UploadSet');
                const items = uploadSet.getItems();
                this.getBase64(items[0].getFileObject()).then(function(data){
                    // console.log(data)

                    $.ajax({
                        url: serviceUrl + `HotelBooking?$filter=req_ID eq ${ID}`,
                        method: "POST",
                        data: JSON.stringify({
                            "document":data
                        }),
                        success: function (response, statusText, xhrToken) {

                            that.getView().getModel('oModel').setProperty('/payload/hotel', response.value)

                        },
                        error: function (errMsg) {
                            MessageBox.error("Something Went Wrong.");
                        }

                    });

                });
            },
            getBase64: function (file) {
                var reader = new FileReader();
                return new Promise((acc, rej) => {

                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        acc(reader.result);
                    }; reader.onerror = function (error) {
                        rej(error)
                    };
                })

            },
            onPressCancelUploadFlightDetails: function () {

                if (!this.oUploadFlight) {
                    this.oUploadFlight = sap.ui.xmlfragment(
                        "travelapp.view.uploadFlight",
                        this
                    );
                }
                this.getView().addDependent(this.oUploadFlight);
                this.oUploadFlight.close();

            }
        });
    });
