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

    const markVO = [
        {
            id: 1,
            coordinates: [33.06208599275346, 68.95469889784452],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            info: {
                building: "./plug.png",
                address: "Мурманск, пр. Кирова, д. 1, корпус Л",
                tel: "8 800 350 12 21",
                mail: "priem@mauniver.ru",
                opening: {
                    pt: "09.00-17.00",
                    break: "13.00-14.00",
                    sb: "выходной",
                    vs: "выходной",
                },
            },
        },
        {
            id: 2,
            coordinates: [33.0767053822784, 68.96478012321226],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            info: {
                building: "./plug.png",
                address: "Апатиты, ул. Лесная, д. 29",
                tel: " 8 815 556 62 20",
                additional: "8 964 687 00 05",
                mail: "priem@arcticsu.ru",
                opening: {
                    pt: "09.00-17.30",
                    sb: "10.00-14.00",
                    vs: "выходной",
                },
            },
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

        _createChoiceList() {
            const choiceListTemplate = `
            <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action active" aria-current="true">Мурманск, пр. Кирова, д. 1, корпус Л</li>
            <li class="list-group-item list-group-item-action">Апатиты, ул. Лесная, д. 29</li>
            </ul>
            `;
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
            const closeBtn = document.createElement("div");

            popupElement.className = "popup";
            closeBtn.className = "close-container";

            const closeIconTemplate = `
            <svg class="popup-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#56aee0"><path d="M5 5L19 19M5 19L19 5" stroke="#56aee0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            `;

            closeBtn.insertAdjacentHTML("beforeend", closeIconTemplate.trim());

            popupElement.append(closeBtn);

            const template = `

            <img src="${this._props.info.building}" />
            <ul class="list-group list-group-flush">

            <li class="list-group-item contacts__tel">
                <a href="tel:${this._props.info.tel}" class="link">${this._props.info.tel}</a>
                ${this._props.info.additional ? `<a href="tel:${this._props.info.additional}" class="link">${this._props.info.additional}</a>` : ""}
            </li>
            <li class="list-group-item contacts__mail">
                <a href="mailto:${this._props.info.mail}" target="__blank" class="link">${this._props.info.mail}</a>
            </li>
            <li class="list-group-item contacts__clock">Пн-пт: ${this._props.info.opening.pt} <br/>
            ${this._props.info.opening.break ? `Обед: ${this._props.info.opening.break} <br/>` : ""}
            Сб: ${this._props.info.opening.sb} <br/>
            Вс: ${this._props.info.opening.vs}
            </li>
            </ul>
            `;

            popupElement.insertAdjacentHTML("beforeend", template.trim());

            closeBtn.onclick = () => {
                this._popupOpen = false;
                this._actualizePopup();
            };

            this._popup = popupElement;
        }
    }

    const map = new YMap(
        document.getElementById("vo-map"),
        {
            location: {
                center: [33.06208599275346, 68.95469889784452],
                zoom: 15,
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

    markVO.forEach((marker) => {
        map.addChild(new CustomMarkerWithPopup({ coordinates: marker.coordinates, popupContent: marker.message, icon: marker.iconSrc, info: marker.info }));
    });
}

initMap();
