namespace("leesa.visual").simpleLabel = (function(leesa, _, d3) {

    
    var containerId = leesa.util.uniqueId();
    var magicalChart = {
        extend: function(quadrant) {},
        render: function render(quadrant, callback) {
            var content = quadrant.htmlJContent();
            var visual = quadrant.visual();
            var parameters = visual.parameters;
            var displayValue = parameters.displayValue;

            _.each(content,function (domObject) {
                    hackDashboard(domObject);//change to find from parent
                    var jObject = $(domObject);
                    var jContainer = $("<div />").css({
                        height: "100%",
                        width: "100%",
                        "display": "flex",
                    })
                    .html(displayValue || "hello")
                jObject.append(jContainer);
                });

            callback(quadrant);


            return;

            //#region Private Methods

            function hackDashboard(jObject) {
                var localURL = document.URL;
                if (!_.isEmpty(localURL.match(/Workspace/))) {
                    return;
                }

                var jCellWrapper = $(jObject.closest(".leesa__cell"));
                if (jCellWrapper) {
                 
                    jCellWrapper
                           .css({
                               "background-color": "transparent",
                               "box-shadow": "none"
                           });

                    jCellWrapper.closest(".grid-stack-item-content.leesa__flipContainer")
                        .css({
                            "background-color": "transparent",
                            "box-shadow": "none"
                        });

                    
                    jCellWrapper.find(".leesa__header").css("display", "none");
                    jCellWrapper.find(".leesa__content").css("padding-top", "0");
                }
            }

            //#endregion
        },
        configuration: {},
    };
    return magicalChart;

})(leesa, _, d3);

