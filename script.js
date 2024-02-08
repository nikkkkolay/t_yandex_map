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

    const markerVo = [
        {
            id: 0,
            locations: {
                coordinates: [33.06208599275346, 68.95469889784452],
                center: [33.0635749927398, 68.95531068571091],
            },
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            info: {
                name: "Мурманск, пр. Кирова, д. 1",
                building: "./plug.png",
                address:
                    "183010, Мурманск, пр. Кирова, д. 1, корпус Л, каб. 112",
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
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
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

    const markerSpo = [
        {
            id: 0,
            locations: {
                coordinates: [33.06618599999991, 68.95360154944407],
                center: [33.06618599999991, 68.95360154944407],
            },
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            info: {
                name: "Мурманск, ММРК им. И.И. Месяцева",
                building: "./plug.png",
                address:
                    "183010, Мурманск, пр. Кирова, д. 1, корпус Л, каб. 108",
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
                center: [33.073974499999984, 68.9635510494362],
            },
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
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
                center: [33.4318545, 69.204023548947],
            },
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
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
                center: [33.675953499999984, 67.61130605196836],
            },
            iconSrc:
                "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            info: {
                name: "Филиал город Кировск",
                building: "./plug.png",
                address:
                    "184250, г. Кировск, ул. 50 лет Октября, д. 2, корпус 1, каб. 1116",
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

    const {
        YMapComplexEntity,
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
    } = ymaps3;

    const list = document.getElementById("choice");

    class CustomMap extends YMapComplexEntity {
        constructor(props) {
            super(props);
            this._popupOpen = false;
        }

        _onAttach() {
            this._createChoiceList();
            this._createPopup();
            this._createMarker();
            this._actualizePopup();
        }

        _onDetach() {
            this._marker = null;
        }

        _onUpdate(props) {
            if (props.locations.coordinates) {
                this._marker?.update({
                    coordinates: props.locations.coordinates,
                });
            }
        }

        _actualizePopup() {
            if (this._popupOpen) {
                this._popup.style.display = "flex";
            } else {
                this._popup.style.display = "none";
            }
        }

        _createChoiceList() {
            const choiceRoot = document.createElement("div");
            const choiceElement = document.createElement("input");
            const choiceLabel = document.createElement("label");

            choiceElement.dataset.id = this._props.id;
            choiceLabel.textContent = this._props.info.name;

            choiceRoot.classList = "form-check";
            choiceElement.classList = "form-check-input";
            choiceLabel.classList = "form-check-label";

            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("id", `${this._props.id}`);
            choiceElement.setAttribute("value", `${this._props.id}`);
            choiceElement.setAttribute("name", `${this._props.id}`);

            choiceLabel.setAttribute("for", `${this._props.id}`);

            if (choiceElement.id == "0") choiceElement.checked = true;

            choiceElement.onclick = (e) => {
                const choiceElements =
                    document.querySelectorAll(".form-check-input");

                const targetId = e.target.id;

                choiceElements.forEach((element) => {
                    if (targetId === element.id) {
                        element.checked;
                    } else {
                        element.checked = false;
                    }
                });

                map.setLocation({
                    center: this._props.locations.center,
                    zoom: 17,
                });
                this._popupOpen = true;
                this._actualizePopup();
            };

            choiceRoot.append(choiceElement, choiceLabel);
            this._props.list.append(choiceRoot);
        }

        _createMarker() {
            const container = document.createElement("div");
            const marker = document.createElement("img");
            marker.className = "icon-marker";
            marker.src = this._props.icon;
            marker.className = "icon-marker";
            marker.onclick = () => {
                this._popupOpen = !this._popupOpen;
                this._actualizePopup();
                map.setLocation({
                    center: this._props.locations.center,
                    zoom: 17,
                    duration: 1000,
                });
            };
            container.append(marker, this._popup);
            this._marker = new YMapMarker(
                { coordinates: this._props.locations.coordinates },
                container
            );
            this.addChild(this._marker);
        }

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
                <a href="tel:${this._props.info.tel}" class="link">${
                this._props.info.tel
            }</a>
                ${
                    this._props.info.additional
                        ? `<a href="tel:${this._props.info.additional}" class="link">${this._props.info.additional}</a>`
                        : ""
                }
            </li>
            <li class="list-group-item contacts__mail">
                <a href="mailto:${
                    this._props.info.mail
                }" target="__blank" class="link">${this._props.info.mail}</a>
            </li>
            <li class="list-group-item contacts__adress">${
                this._props.info.address
            }</li>
            <li class="list-group-item contacts__clock">Пн-пт: ${
                this._props.info.opening.pt
            } <br/>
            ${
                this._props.info.opening.break
                    ? `Обед: ${this._props.info.opening.break} <br/>`
                    : ""
            }
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
        document.getElementById("map"),
        {
            location: {
                center: [33.062161093992, 68.95471611252427],
                zoom: 17,
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

    markerVo.forEach((marker) => {
        map.addChild(
            new CustomMap({
                id: marker.id,
                locations: marker.locations,
                icon: marker.iconSrc,
                info: marker.info,
                list: list,
            })
        );
    });
}

initMap();
