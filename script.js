$(window).bind("scroll", function () {
    if ($(window).scrollTop() > 170) {
        $(".navbar-bottom").addClass("fixed");
    } else {
        $(".navbar-bottom").removeClass("fixed");
    }
});

$(window).bind("scroll", function () {
    if ($(window).scrollTop() > 3100) {
        $(".button_fixed").addClass("button_fixed_change");
    } else {
        $(".button_fixed").removeClass("button_fixed_change");
    }
});

$(window).bind("load", function () {
    if ($(window).scrollTop() > 170) {
        $(".navbar-bottom").addClass("fixed");
    } else {
        $(".navbar-bottom").removeClass("fixed");
    }
});

$(".navbar-collapse").on("click", function () {
    $(".navbar-collapse").collapse("hide");
    $a = $($(this).attr("href"));
    $("html,body").animate(
        {
            scrollTop: $a.offset().top - 50,
        },
        500
    );
    return false;
});

async function initMap() {
    await ymaps3.ready;

    const markerPropsVO = [
        {
            coordinates: [33.06208599275346, 68.95469889784452],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            message: "I'm yellow capybara!",
        },
        {
            coordinates: [33.0767053822784, 68.96478012321226],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            message: "I'm yellow capybara!",
        },
    ];

    const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    class CustomMarkerWithPopup extends YMapComplexEntity {
        constructor(props) {
            super(props);
            this._popupOpen = false;
        }

        // Handler for attaching the control to the map
        _onAttach() {
            this._createPopup();
            this._createMarker();
            this._actualizePopup();
        }
        // Handler for detaching control from the map
        _onDetach() {
            this._marker = null;
        }
        // Handler for updating marker properties
        _onUpdate(props) {
            if (props.coordinates) {
                this._marker?.update({ coordinates: props.coordinates });
            }
        }
        // Method for updating the status of a popup window
        _actualizePopup() {
            if (this._popupOpen) {
                this._popup.style.display = "flex";
            } else {
                this._popup.style.display = "none";
            }
        }
        // Method for creating a marker element
        _createMarker() {
            const container = document.createElement("div");
            const marker = document.createElement("img");
            marker.className = "icon-marker";
            marker.src = this._props.icon;
            marker.className = "icon-marker";

            marker.onclick = () => {
                this._popupOpen = true;
                this._actualizePopup();
            };

            container.append(marker, this._popup);

            this._marker = new YMapMarker({ coordinates: this._props.coordinates }, container);
            this.addChild(this._marker);
        }
        // Method for creating a popup window element
        _createPopup() {
            const popupElement = document.createElement("div");
            popupElement.className = "popup";

            const textElement = document.createElement("div");
            textElement.className = "popup__text";
            textElement.textContent = this._props.popupContent;

            const closeBtn = document.createElement("button");
            closeBtn.className = "popup__close";
            closeBtn.textContent = "Close Popup";
            closeBtn.onclick = () => {
                this._popupOpen = false;
                this._actualizePopup();
            };

            popupElement.append(textElement, closeBtn);

            this._popup = popupElement;
        }
    }

    const map = new YMap(
        document.getElementById("app-contact"),
        {
            location: {
                center: [33.06208599275346, 68.95469889784452],
                zoom: 16,
            },
        },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    );

    const layer = new YMapDefaultSchemeLayer({
        customization: [
            {
                tags: {
                    all: ["landscape"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#f2fbff",
                    },
                ],
            },
            {
                tags: {
                    all: ["admin"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#eaf6fc",
                    },
                ],
            },
            {
                tags: {
                    all: ["road"],
                },
                elements: "geometry.fill",
                stylers: [
                    {
                        color: "#FAFAFA",
                    },
                ],
            },
            {
                tags: {
                    all: ["road"],
                },
                elements: "geometry.outline",
                stylers: [
                    {
                        color: "#CCCCCC",
                    },
                ],
            },
            {
                tags: {
                    all: ["crosswalk", "path"],
                },
                stylers: [
                    {
                        color: "#14898f",
                    },
                ],
            },
            {
                tags: {
                    any: ["structure"],
                },
                stylers: [
                    {
                        color: "#DDDDDD",
                    },
                ],
            },
            {
                tags: {
                    any: ["water"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#56aee0",
                    },
                ],
            },
            {
                tags: {
                    any: ["transit"],
                },
                elements: "label.icon",
                stylers: [
                    {
                        color: "#14898F",
                    },
                ],
            },
            {
                tags: {
                    any: ["transit"],
                },
                elements: "label.text.fill",
                stylers: [
                    {
                        color: "#14898F",
                    },
                ],
            },
            {
                tags: {
                    any: ["poi"],
                },
                elements: "label.icon",
                stylers: [
                    {
                        color: "#666666",
                    },
                ],
            },
            {
                tags: {
                    any: ["poi"],
                },
                elements: "label.text.fill",
                stylers: [
                    {
                        color: "#666666",
                    },
                ],
            },
        ],
    });

    map.addChild(layer);

    markerPropsVO.forEach((marker) => {
        map.addChild(new CustomMarkerWithPopup({ coordinates: marker.coordinates, popupContent: marker.message, icon: marker.iconSrc }));
    });
}

initMap();
