namespace("fx.quadrantProperties")["simpleLabel"] = (function (ko, _, leesa, fx, fxDataContext, fxUtil, fxEnum) {

    //#region shorthand
    
    var observable = ko.observable;
    var observableArray = ko.observableArray;
    var computed = ko.computed;

    var enumState = fxEnum.state;
    var dashboardState = enumState.stateAndMessage();
    var application = fxDataContext.Application;
    var dashboardViewApi = application.dashboardView;
    
    function model(params) {
        
        //#region Param properties
        var fxQuadrant = params.quadrantViewModel;
        var quadrantComposer = fxQuadrant.quadrantComposer;
        var koVisual = quadrantComposer.visual;
        var refreshQuadrant = fxQuadrant.refreshQuadrant;
        var refreshVisual = quadrantComposer.refreshVisual;
        //#endregion

        //#region Public properties

        var koDisplayValue = observable("<span style=\"" +
            "align-self: center;font-size: 30px;color: #787b7d;font-weight: bold;" +
            "\">Default Title</span>");

        //#endregion

        //#region event

        koDisplayValue.subscribe(function (displayValue) {
            setNRefresh("displayValue", displayValue);
        });

        var initPropertiesValue = computed(function () {
            var visual = koVisual();
            if (!visual)
                return;

            if(visual.parameters.displayValue){
                koDisplayValue(visual.parameters.displayValue);
            }

            return;
        });
        

        //#endregion

        init();

        function init() {
            initEvent();
        }

        function initEvent() {
        }

        //#region Private Methods
        function setNRefresh(propertyKey, newValue) {
            var visual = koVisual();
            if (visual[propertyKey] === newValue)
                return;

            visual[propertyKey] = newValue;
            var parameters = visual.parameters || {};
            parameters[propertyKey] = newValue;
            visual.parameters = parameters;
        }

        //#endregion

        var me = this;
        $.extend(true, me, {
            displayValue: koDisplayValue,
        });

        return;
    }

    return {
        viewModel: model
    };

})(ko, _, leesa, fx, fx.DataContext, fx.util, fx.enum);