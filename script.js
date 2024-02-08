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
            id: 1,
            locations: {
                coordinates: [33.0767053822784, 68.96478012321226],
                center: [33.07792609562602, 68.96538650122898],
            },
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
    const list = document.getElementById("vo-choice");

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
                this._marker?.update({ coordinates: props.locations.coordinates });
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
            choiceLabel.textContent = this._props.info.address;

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
                const choiceElements = document.querySelectorAll(".form-check-input");

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
                });
            };
            container.append(marker, this._popup);
            this._marker = new YMapMarker({ coordinates: this._props.locations.coordinates }, container);
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
                center: [33.062135043261854, 68.9547602108598],
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
        map.addChild(new CustomMap({ id: marker.id, locations: marker.locations, icon: marker.iconSrc, info: marker.info, list: list }));
    });
}

initMap();
