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

    const dataVo = [
        {
            id: 0,
            locations: {
                coordinates: [33.06618599999991, 68.95360154944407],
                center: [33.0673554431304, 68.95425711576365],
            },
            iconSrc: "./marker.svg",
            info: {
                active: true,
                name: "Мурманск, пр. Кирова, д. 1",
                building: "./plug.png",
                address: "183010, Мурманск, пр. Кирова, д. 1, корпус Л, каб. 112",
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
            id: 1,
            locations: {
                coordinates: [33.40823749999997, 67.5853380520345],
                center: [33.40967293145593, 67.5859512914979],
            },
            iconSrc: "./marker.svg",
            info: {
                name: "Апатиты, ул. Лесная, д. 29",
                building: "./plug.png",
                address: "184209, г. Апатиты, ул. Лесная, д. 29",
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

    const dataSpo = [
        {
            id: 0,
            locations: {
                coordinates: [33.06618599999991, 68.95360154944407],
                center: [33.06814701625086, 68.95448301008369],
            },
            iconSrc: "./marker.svg",
            info: {
                active: true,
                name: "Мурманск, ММРК им. И.И. Месяцева",
                building: "./plug.png",
                address: "183010, Мурманск, пр. Кирова, д. 1, корпус Л, каб. 108",
                tel: "8 815 240 33 35",
                mail: "priem.mmrk@mauniver.ru",
                opening: {
                    pt: "09.00-18.00",
                    sb: "10.00-16.00",
                    vs: "выходной",
                },
            },
        },
        {
            id: 1,
            locations: {
                coordinates: [33.073974499999984, 68.9635510494362],
                center: [33.07554091006468, 68.9643258076825],
            },
            iconSrc: "./marker.svg",
            info: {
                name: "Мурманск, Колледж МАУ",
                building: "./plug.png",
                address: "183038, Мурманск, пр. Ленина, д. 57, каб. 107",
                tel: "8 815 221 38 72",
                mail: "priem.spo@mauniver.ru",
                opening: {
                    pt: "09.00-17.00",
                    sb: "10.00-16.00",
                    vs: "выходной",
                },
            },
        },
        {
            id: 2,
            locations: {
                coordinates: [33.4318545, 69.204023548947],
                center: [33.433539817903025, 69.20478506937228],
            },
            iconSrc: "./marker.svg",
            info: {
                name: "Филиал город Полярный",
                building: "./plug.png",
                address: "184651, г. Полярный, ул. Лунина, д. 5",
                tel: "8 815 517 36 60",
                mail: "priem.pf@mauniver.ru",
                opening: {
                    pt: "09.00-17.00",
                    sb: "10.00-14.00",
                    vs: "выходной",
                },
            },
        },
        {
            id: 3,
            locations: {
                coordinates: [33.675953499999984, 67.61130605196836],
                center: [33.67729463509588, 67.61218135170577],
            },
            iconSrc: "./marker.svg",
            info: {
                name: "Филиал город Кировск",
                building: "./plug.png",
                address: "184250, г. Кировск, ул. 50 лет Октября, д. 2, корпус 1, каб. 1116",
                tel: "8 815 315 54 08",
                mail: "priem.kirovsk@mauniver.ru",
                opening: {
                    pt: "09.00-17.00",
                    sb: "выходной",
                    vs: "выходной",
                },
            },
        },
    ];

    const layer = {
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
    };

    const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const voMap = document.getElementById("mapVo");
    const spoMap = document.getElementById("mapSpo");
    const listVo = document.getElementById("choiceVo");
    const listSpo = document.getElementById("choiceSpo");

    class CustomMap extends YMapComplexEntity {
        constructor() {
            super();
            this._popupOpen = false;
            this._data = [];
            this._map = null;
            this._list = null;
        }

        _actualizePopup() {
            if (!this._popupOpen) {
                this._popup.style.display = "flex";
            } else {
                this._popup.style.display = "none";
            }
        }

        _createChoiceList(marker) {
            const choiceRoot = document.createElement("div");
            const choiceElement = document.createElement("input");
            const choiceLabel = document.createElement("label");

            choiceLabel.textContent = marker.info.name;

            choiceRoot.classList = "form-check";
            choiceElement.classList = "form-check-input";
            choiceLabel.classList = "form-check-label";

            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("id", `${marker.info.name}`);
            choiceElement.setAttribute("value", `${marker.info.name}`);
            choiceElement.setAttribute("name", `${marker.info.name}`);
            choiceLabel.setAttribute("for", `${marker.info.name}`);

            if (marker.info.active) choiceElement.checked = true;

            choiceElement.onclick = (e) => {
                const choiceElements = document.querySelectorAll(".form-check-input");

                const targetId = e.target.id;

                choiceElements.forEach((element) => {
                    if (targetId === element.id) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                });

                this._map.setLocation({
                    center: marker.locations.center,
                    zoom: 17,
                    duration: 500,
                });
                this._popupOpen = true;
                this._actualizePopup();
            };

            choiceRoot.append(choiceElement, choiceLabel);
            this._list.append(choiceRoot);
        }

        _createMarker(marker) {
            const container = document.createElement("div");
            const markerIcon = document.createElement("img");
            markerIcon.className = "icon-marker";
            markerIcon.src = marker.iconSrc;
            markerIcon.onclick = () => {
                this._popupOpen = !this._popupOpen;
                this._actualizePopup();
                this._map.setLocation({
                    center: marker.locations.center,
                    zoom: 17,
                    duration: 1000,
                });
            };
            container.append(markerIcon, this._popup);
            this._map.addChild(new YMapMarker({ coordinates: marker.locations.coordinates }, container));
        }

        _createPopup(marker) {
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
            <img src="${marker.info.building}" />
            <ul class="list-group list-group-flush">
            <li class="list-group-item contacts__tel">
                <a href="tel:${marker.info.tel}" class="link">${marker.info.tel}</a>
                ${marker.info.additional ? `<a href="tel:${marker.info.additional}" class="link">${marker.info.additional}</a>` : ""}
            </li>
            <li class="list-group-item contacts__mail">
                <a href="mailto:${marker.info.mail}" target="__blank" class="link">${marker.info.mail}</a>
            </li>
            <li class="list-group-item contacts__adress">${marker.info.address}</li>
            <li class="list-group-item contacts__clock">Пн-пт: ${marker.info.opening.pt} <br/>
            ${marker.info.opening.break ? `Обед: ${marker.info.opening.break} <br/>` : ""}
            Сб: ${marker.info.opening.sb} <br/>
            Вс: ${marker.info.opening.vs}
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

        render(data, map, list) {
            this._data = data;
            this._map = map;
            this._list = list;
            this._map.addChild(
                this._data.forEach((marker) => {
                    this._createChoiceList(marker);
                    this._createPopup(marker);
                    this._createMarker(marker);
                })
            );
        }
    }

    const voCustomMap = new CustomMap();
    const spoCustomMap = new CustomMap();

    const mapVo = new YMap(
        voMap,
        {
            location: {
                center: [33.06618599999991, 68.95360154944407],
                zoom: 18,
            },
        },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    );

    const mapSpo = new YMap(
        spoMap,
        {
            location: {
                center: [33.06618599999991, 68.95360154944407],
                zoom: 18,
            },
        },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    );

    const layerVo = new YMapDefaultSchemeLayer(layer);
    const layerSpo = new YMapDefaultSchemeLayer(layer);

    mapVo.addChild(layerVo);
    mapSpo.addChild(layerSpo);

    voCustomMap.render(dataVo, mapVo, listVo);
    // spoCustomMap.render(dataSpo, mapSpo, listSpo);
}

initMap();
